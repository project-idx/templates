/*
  Copyright 2024 Google LLC
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.  
  
  You may obtain a copy of the License at
  
   https://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed  
  under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing  
  permissions and
  limitations under the License.
*/
// Copyright 2023 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Outyet is a web server that announces whether or not a particular Go version
// has been tagged.
package main

import (
	"expvar"
	"flag"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"sync"
	"time"
)

// Command-line flags.
var (
	httpAddr   = flag.String("http", "localhost:8080", "Listen address")
	pollPeriod = flag.Duration("poll", 5*time.Second, "Poll period")
	version    = flag.String("version", "1.20", "Go version")
)

const baseChangeURL = "https://go.googlesource.com/go/+/"

func main() {
	flag.Parse()
	changeURL := fmt.Sprintf("%sgo%s", baseChangeURL, *version)
	http.Handle("/", NewServer(*version, changeURL, *pollPeriod))

	// API endpoints
	http.HandleFunc("/api/data", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello World - loaded via htmx!")
	})

	log.Printf("serving http://%s", *httpAddr)
	log.Fatal(http.ListenAndServe(*httpAddr, nil))
}

// Exported variables for monitoring the server.
// These are exported via HTTP as a JSON object at /debug/vars.
var (
	hitCount       = expvar.NewInt("hitCount")
	pollCount      = expvar.NewInt("pollCount")
	pollError      = expvar.NewString("pollError")
	pollErrorCount = expvar.NewInt("pollErrorCount")
)

// Server implements the outyet server.
// It serves the user interface (it's an http.Handler)
// and polls the remote repository for changes.
type Server struct {
	version string
	url     string
	period  time.Duration

	mu  sync.RWMutex // protects the yes variable
	yes bool
}

// NewServer returns an initialized outyet server.
func NewServer(version, url string, period time.Duration) *Server {
	s := &Server{version: version, url: url, period: period}
	go s.poll()
	return s
}

// poll polls the change URL for the specified period until the tag exists.
// Then it sets the Server's yes field true and exits.
func (s *Server) poll() {
	for !isTagged(s.url) {
		pollSleep(s.period)
	}
	s.mu.Lock()
	s.yes = true
	s.mu.Unlock()
	pollDone()
}

// Hooks that may be overridden for integration tests.
var (
	pollSleep = time.Sleep
	pollDone  = func() {}
)

// isTagged makes an HTTP HEAD request to the given URL and reports whether it
// returned a 200 OK response.
func isTagged(url string) bool {
	pollCount.Add(1)
	r, err := http.Head(url)
	if err != nil {
		log.Print(err)
		pollError.Set(err.Error())
		pollErrorCount.Add(1)
		return false
	}
	return r.StatusCode == http.StatusOK
}

// ServeHTTP implements the HTTP user interface.
func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	hitCount.Add(1)
	s.mu.RLock()
	data := struct {
		URL     string
		Version string
		Yes     bool
	}{
		s.url,
		s.version,
		s.yes,
	}
	s.mu.RUnlock()
	err := tmpl.Execute(w, data)
	if err != nil {
		log.Print(err)
	}
}

// tmpl is the HTML template that drives the user interface.
var tmpl = template.Must(template.ParseFiles("index.html"))

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
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:watcher/watcher.dart';

Future<void> main() async {
  final watcher = DirectoryWatcher('bin');
  Process? serverProcess;

  Future<void> startServer() async {
    serverProcess = await Process.start(
      'dart',
      ['run', 'bin/server.dart'],
      environment: {'PORT': '3000'},
    );
    serverProcess?.stdout.transform(utf8.decoder).listen((data) {
      print(data);
    });
    serverProcess?.stderr.transform(utf8.decoder).listen((data) {
      print(data);
    });
  }

  Future<void> restartServer() async {
    if (serverProcess != null) {
      serverProcess?.kill();
      serverProcess = null;
    }
    await startServer();
  }

  watcher.events.listen((event) async {
    print('File change detected: ${event.path}');
    await restartServer();
  });

  // Start the server initially
  await startServer();
}
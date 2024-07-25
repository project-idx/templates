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
// "use client"; // This is a client component 👈🏽
import Email from "./Email.client"
import { listInbox } from '@email-app/email'
import dataConnect from "@/data-connect";

export default async function Home() {
	// Change the uid value to see emails from different users
	// Stay tuned for an update that will combine Data Connect with
	// Firebase Auth!
	// uids from the data seed: user_david, user_tyler, user_bleigh, user_jeanine
	const uid = "user_jeanine"
	// This is the URL needed to configure the reverse proxy so that all requests
	// are sent through the Vite dev server and we can avoid CORS issues from the local
	// Data Connect emulator server. If this code is being executed on the
	// server we only need localhost.
	const host = process.env.WEB_HOST!
	const dc = dataConnect('localhost');
	const { data } = await listInbox(dc, { uid })
	return (
		<Email 
			initialEmails={data.emails}
			uid={uid}
			host={host}
		 />
	);
}

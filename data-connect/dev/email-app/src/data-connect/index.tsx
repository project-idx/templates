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
import { initializeApp } from 'firebase/app';
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect'
import { connectorConfig } from '@email-app/email'

export default (host: string = 'localhost') => {
	const firebaseApp = initializeApp({});
	const dataConnect = getDataConnect(firebaseApp, connectorConfig)
	const isBrowser = typeof process !== 'undefined' && process.browser;

	if(dataConnect.isEmulator) {
		return dataConnect;
	}
	// If this is running on the client then tell Data Connect to use
	// the reverse proxy to send requests.
	// Note: This is only needed when running in a Cloud Editor
	if (isBrowser) {
		connectDataConnectEmulator(
			dataConnect, 
			`9000-${host}`, 
			undefined, 
			true
		);	
	} else {
		// It is always 'localhost' on the server
		connectDataConnectEmulator(
			dataConnect, 
			'localhost', 
			9399, 
			false
		);
	}
	return dataConnect;
};
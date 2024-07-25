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
export function maybeShowApiKeyBanner(key, action = `enter it at the top of
<code>main.js</code>`) {
  if (key === 'TODO') {
    let banner = document.createElement('div');
    banner.className = 'api-key-banner';
    banner.innerHTML = `
      To get started with the Gemini API,
      <a href="https://g.co/ai/idxGetGeminiKey" target="_blank">
      get an API key</a> (Ctrl+Click) and ${action}`;
    document.body.prepend(banner);
  }
}
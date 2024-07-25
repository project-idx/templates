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
import {HumanMessage} from '@langchain/core/messages';
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import {HarmBlockThreshold, HarmCategory} from '@google/generative-ai';
import Base64 from 'base64-js';
import MarkdownIt from 'markdown-it';
import {maybeShowApiKeyBanner} from './gemini-api-banner';
import './style.css';

// 🔥 SET `GOOGLE_API_KEY` IN YOUR .env FILE! 🔥
// 🔥 GET YOUR GEMINI API KEY AT 🔥
// 🔥 https://g.co/ai/idxGetGeminiKey 🔥

const form = document.querySelector('form');
const promptInput = document.querySelector('input[name="prompt"]');
const output = document.querySelector('.output');

form.onsubmit = async ev => {
  ev.preventDefault();
  output.textContent = 'Generating...';

  try {
    // Load the image as a base64 string
    const imageUrl = form.elements.namedItem('chosen-image').value;
    const imageBase64 = await fetch(imageUrl)
      .then(r => r.arrayBuffer())
      .then(a => Base64.fromByteArray(new Uint8Array(a)));

    const contents = [
      new HumanMessage({
        content: [
          {
            type: 'text',
            text: promptInput.value,
          },
          {
            type: 'image_url',
            image_url: `data:image/png;base64,${imageBase64}`,
          },
        ],
      }),
    ];

    // Call the multimodal model, and get a stream of results
    const vision = new ChatGoogleGenerativeAI({
      modelName: 'gemini-1.5-flash', // or gemini-1.5-pro
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    // Multi-modal streaming
    const streamRes = await vision.stream(contents);

    // Read from the stream and interpret the output as markdown
    const buffer = [];
    const md = new MarkdownIt();

    for await (const chunk of streamRes) {
      buffer.push(chunk.content);
      output.innerHTML = md.render(buffer.join(''));
    }
  } catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

// You can delete this once you've filled out an API key
maybeShowApiKeyBanner(process.env.GOOGLE_API_KEY, `enter it in your <code>.env</code> file.`);

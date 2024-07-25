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
import type {Config} from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["Google Sans", "sans-serif"],
			display: ["Google Sans Display", "sans-serif"],
		},
		extend: {
			colors: {
				gray: {...colors.neutral},
				"google-blue": "#4285F4",
				"google-green": "#34A853",
				"google-yellow": "#FBBC05",
				"google-red": "#EA4335",
			},transitionTimingFunction: {
        'custom-out': 'cubic-bezier(0, 0.52, 0.17, 0.96)',
        'custom-in': 'cubic-bezier(0.7, 0.1, 0.9, 0.47)',
				'm-ease': 'cubic-bezier(0.86, 0, 0.07, 1)'
      },
		},
	},
	plugins: [],
};
export default config;

import { MessageData } from '@genkit-ai/ai';

export const messages: MessageData[] = [
  {
    role: "system",
    content: [{ text: "You are a helpful assistant." }],
  },
  {
    role: "user",
    content: [
      { text: "What is in this image?" },
      {
        media: {
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", // Example 1x1 pixel PNG
          contentType: "image/png",
        },
      },
    ],
  },
  {
    role: "tool",
    content: [
      {
        toolRequest: {
          name: "getWeather",
          input: { location: "Washington DC" },
        },
      },
    ],
  },
];

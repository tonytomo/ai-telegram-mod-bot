# AI Bot Moderator

This is a simple AI bot moderator that can be used to moderate conversations in a chat application. It uses the Text Generative AI such as Gemini, GPT, and Claude to generate responses based on the user message.

# Technologies Used

- Node.js
- AWS Lambda
- Text Generative AI (Gemini)
- Telegram Bot API

# Features

- Moderates conversations in a chat application
- Uses Text Generative AI to generate responses
- Can be used with various AI models like Gemini, GPT, and Claude

# Installation and Deployment to Lambda

1. Zip ONLY the contents of `src` folder.
2. Go to the AWS Lambda console.
3. Create a new Lambda function.
4. Set the runtime to Node.js 22.x.
5. Upload the zipped contents of `src` folder.

# Setup Layers

1. Run the following command to create a layer for the `node_modules`:
   ```bash
   mkdir nodejs
   cp -r src/node_modules nodejs/
   zip -r layer.zip nodejs
   ```
2. Go to the AWS Lambda console.
3. Create a new layer.
4. Set the custom layer and select the runtime as Node.js 22.x.
5. Upload the `layer.zip` file.
6. Add the layer to your Lambda function.

# Environment Variables

API_KEY: Your API key for the AI model you are using (e.g., Gemini, GPT, Claude).
CHAT_APP_TOKEN: The token for your chat application (e.g., Discord, Slack, Telegram).

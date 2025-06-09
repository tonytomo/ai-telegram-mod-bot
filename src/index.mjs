import { sendMessage } from "./lib/telegram.mjs";
import { processCommand, processMessage } from "./lib/bot.mjs";
import { welcomeText } from "./lib/instructions.mjs";
import { aiAnswer } from "./lib/ai.mjs";

/**
 * AWS Lambda function handler
 * @description This function handles webhook events from Telegram API and processes the incoming messages
 * @param {Object} event - The event object passed by AWS Lambda
 * @param {Object} context - The context object passed by AWS Lambda
 * @returns {Promise<Object>} - The response object
 */
export const handler = async (event, context) => {
  /**
   * TESTING PURPOSES ONLY
   * This is to avoid sending messages to the user
   */
  const isTest = event.is_test;
  const prompt = event.prompt;

  /**
   * If the incoming event is a test event, return early
   * This is to avoid processing test events and avoid sending messages to the user
   */
  if (isTest) {
    await aiAnswer(prompt);
    return "TESTING: Prompting using AI";
  }

  /**
   * CHAT BOT LOGIC
   * This is the main logic of the chat bot
   * It processes the incoming messages and sends the response back to the user
   */
  const body = JSON.parse(event.body);
  const message = body.message;
  const isNewMembers = !!message.new_chat_members;
  const reply = message.reply_to_message;
  const from = message.from;
  const chat = message.chat;
  const text = message.text;

  /**
   * If the text is empty, return early
   */
  if (!text) {
    return;
  }

  /**
   * If the message is a reply to another message, return early
   */
  if (reply) {
    return;
  }

  /**
   * If the message is sent by a bot, return early
   */
  if (from.is_bot) {
    return;
  }

  /**
   * If the message is new member event, send welcome message
   */
  if (isNewMembers) {
    const res = await sendMessage(chat.id, welcomeText);
    return "WELCOME NEW MEMBERS";
  }

  /**
   * Convert the message text to lowercase for easier processing
   */
  const messageText = text.toLowerCase();
  console.log("INCOMING MESSAGE: ", message);

  /**
   * If the message is a command, process it and return response
   */
  if (messageText.startsWith("/")) {
    const res = await processCommand(
      messageText,
      chat.type,
      chat.id,
      message.message_id
    );
    return "EVENT HANDLED:" + res;
  }

  /**
   * If the message is NOT a command, process it and return response
   */
  if (!messageText.startsWith("/")) {
    const res = await processMessage(
      messageText,
      chat.type,
      chat.id,
      message.message_id
    );
    return "EVENT HANDLED:" + res;
  }

  return "EVENT IS NOT HANDLED";
};

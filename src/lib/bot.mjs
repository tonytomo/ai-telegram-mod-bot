import { helloText, statusText, helpText } from "./instructions.mjs";
import { sendMessage, deleteMessage, getMember } from "./telegram.mjs";
import { aiAnswer } from "./ai.mjs";
import { isContainingBannedWord } from "./rules.mjs";

/**
 * Function processCommand: processes the command given by the user
 * @param {string} text - the text of the command
 * @param {string} chatId - the id of the chat where the command was sent
 * @param {string} messageId - the id of the message containing the command
 *
 * @returns {Promise<void>} - a promise that resolves when the command has been processed
 */
export const processCommand = async (text, type, chatId, messageId) => {
  const command = text.substring(1);

  /**
   * If containing banned words, delete the message
   */
  if (isContainingBannedWord(command)) {
    await deleteMessage(chatId, messageId);
    return "Message is deleted because it contains banned words.";
  }

  /**
   * Hello: sends a greeting message to the user
   */
  if (command === "halo") {
    await sendMessage(chatId, helloText);
    return "Hello message is sent.";
  }

  /**
   * Check: check bot status
   */
  if (command === "cek") {
    await sendMessage(chatId, statusText);
    return "Status message is sent.";
  }

  /**
   * Help: sends a help message to the user
   */
  if (command === "bantuan") {
    await sendMessage(chatId, helpText);
    return "Help message is sent.";
  }
};

/**
 * Function processMessage: processes the message given by the user
 * @param {string} text - the text of the message
 * @param {string} chatId - the id of the chat where the message was sent
 * @param {string} messageId - the id of the message containing the command
 *
 * @returns {Promise<void>} - a promise that resolves when the message has been processed
 */
export const processMessage = async (text, type, chatId, messageId) => {
  /**
   * If containing banned words, delete the message
   */
  if (isContainingBannedWord(text)) {
    await deleteMessage(chatId, messageId);
    return "Message is deleted because it contains banned words.";
  }

  /**
   * If the message starts with "halo bro," then use ai from ai.mjs to get the answer
   */
  if (text.startsWith("halo bro,")) {
    const prompt = text.substring(10);
    const answer = await aiAnswer(prompt);
    await sendMessage(chatId, answer);
    return "AI Answer is sent:\n" + answer;
  }

  /**
   * If the message is private, then use ai from ai.mjs to get the answer
   */
  if (type === "private") {
    const answer = await aiAnswer(text);
    await sendMessage(chatId, answer);
    return "AI Answer is sent privately:\n" + answer;
  }
};

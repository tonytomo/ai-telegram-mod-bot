const API_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${API_TOKEN}`;

/**
 * API Endpoints
 */
export const bot = {
  send: `${BASE_URL}/sendMessage?`,
  delete: `${BASE_URL}/deleteMessage?`,
  getMember: `${BASE_URL}/getChatMember?`,
  warn: `${BASE_URL}/restrictChatMember?`, // not yet implemented
  ban: `${BASE_URL}/banChatMember?`, // not yet implemented
};

/**
 * Function getParam: convert object to URLSearchParams string
 * @param {object} object - object to convert
 * @returns {string} - URLSearchParams
 */
export const getParam = (object) => new URLSearchParams(object).toString();

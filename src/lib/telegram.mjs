import { bot, getParam } from "./url.mjs";

/**
 * Function sendMessage: send a message to a telegram chat
 *
 * @param {string} id - The chat ID to send the message to
 * @param {string} message - The message to send
 * @returns {Promise} - A promise that resolves with the response from the API
 */
export const sendMessage = async (id, message) => {
  const param = getParam({
    chat_id: id,
    text: message,
    parse_mode: "markdown",
  });

  console.log("SENDING MESSAGE:", {
    url: bot.send + param,
    message: message,
  });

  try {
    const res = await fetch(bot.send + param, { method: "GET" });
    const data = await res.json();

    if (!data.ok) console.error(data.description);
    return data.ok;
  } catch (error) {
    console.error("ERROR in send function: ", error);
  }
};

/**
 * Function delete: delete a message from a telegram chat
 *
 * @param {string} id - The chat ID where the message is located
 * @param {string} messageId - The ID of the message to delete
 * @returns {Promise} - A promise that resolves with the response from the API
 */
export const deleteMessage = async (id, messageId) => {
  const param = getParam({
    chat_id: id,
    message_id: messageId,
  });

  console.log("DELETING MESSAGE:", {
    url: bot.delete + param,
    message_id: messageId,
  });

  try {
    const res = await fetch(bot.delete + param, { method: "GET" });
    const data = await res.json();

    if (!data.ok) console.error(data.description);
    return data.ok;
  } catch (error) {
    console.error("ERROR in delete function: ", error);
  }
};

/**
 * Function getMember: get information about a member in a telegram chat
 *
 * @param {string} id - The chat ID where the member is located
 * @param {string} userId - The ID of the user to get information about
 * @returns {Promise} - A promise that resolves with the response from the API
 */
export const getMember = async (id, userId) => {
  const param = getParam({
    chat_id: id,
    user_id: userId,
  });

  console.log("GETTING MEMBER:", {
    url: bot.getMember + param,
    user_id: userId,
  });

  try {
    const res = await fetch(bot.getMember + param, { method: "GET" });
    const data = await res.json();

    if (!data.ok) console.error(data.description);
    return data.ok;
  } catch (error) {
    console.error("ERROR in getMember function: ", error);
  }
};

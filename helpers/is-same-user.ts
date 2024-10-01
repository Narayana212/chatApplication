/**
 * Checks if the current message is from the same user as the previous message
 * @param {any[]} messages - An array of message objects
 * @param {any} m - The current message object
 * @param {number} i - The index of the current message in the messages array
 * @returns {boolean} True if the current message is from the same user as the previous message, false otherwise
 */
export const isSameUser = (messages:any, m:any, i:number) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
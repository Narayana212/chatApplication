/**
 * Checks if the given message is the last message in the conversation and not sent by the user
 * @param {any[]} messages - Array of message objects
 * @param {number} i - Current index in the messages array
 * @param {number} userId - ID of the current user
 * @returns {boolean} True if it's the last message and not sent by the user, false otherwise
 */
export const isLastMessage = (messages:any, i:number, userId:number) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
  
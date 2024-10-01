/**
 * Calculates the margin for a message in a chat interface based on the sender and adjacent messages.
 * @param {any[]} messages - The array of messages in the chat.
 * @param {any} m - The current message being processed.
 * @param {number} i - The index of the current message in the messages array.
 * @param {number} userId - The ID of the current user.
 * @returns {number|string} The margin value: 2/6 if the next message is from the same sender (not the current user),
 *                          0 if the next message is from a different sender or it's the last message (not from the current user),
 *                          "auto" for messages from the current user or other cases.
 */
export const isSameSenderMargin = (messages:any, m:any, i:number, userId:number) => {
    
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 2/6;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };

```
/**
 * Determines if the current message is from a different sender than the next message.
 * @param {any[]} messages - The array of messages to check.
 * @param {any} m - The current message being evaluated.
 * @param {number} i - The index of the current message in the messages array.
 * @param {number} userId - The ID of the current user.
 * @returns {boolean} True if the current message is from a different sender than the next message and not from the current user, false otherwise.
 */
```
export const isSameSender = (messages:any, m:any, i:number, userId:number) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
/**
 * Retrieves the full sender information based on the logged-in user and a list of users.
 * @param {Object} loggedUser - The currently logged-in user object containing at least the _id property.
 * @param {Array} users - An array of user objects, where each object should have an id property.
 * @returns {Object} The full sender information, either the first or second user in the array.
 */
export const getSenderFull = (loggedUser:any, users:any) => {
    return users[0].id === loggedUser._id ? users[0] : users[``];
  };
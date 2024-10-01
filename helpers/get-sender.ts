/**
 * Retrieves the sender's name based on the logged-in user and a list of users.
 * @param {any} loggedUser - The currently logged-in user object.
 * @param {any} users - An array of user objects.
 * @returns {string|undefined} The name of the sender, or undefined if users is falsy.
 */
export const getSender = (loggedUser: any, users: any) => {
    if(!users){
        return
    }
    
    return users[1]?.id === loggedUser?.id ? users[1].name : users[1].name;
};

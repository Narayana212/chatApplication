export const getSenderFull = (loggedUser:any, users:any) => {
    return users[0].id === loggedUser._id ? users[0] : users[``];
  };
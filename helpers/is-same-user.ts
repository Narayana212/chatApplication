export const isSameUser = (messages:any, m:any, i:number) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
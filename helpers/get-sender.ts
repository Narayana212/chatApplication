export const getSender = (loggedUser: any, users: any) => {
    if(!users){
        return
    }
    

    return users[0]?.id === loggedUser?._id ? users[0].name : users[1].name;
};

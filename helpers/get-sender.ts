export const getSender = (loggedUser: any, users: any) => {
    if(!users){
        return
    }
    
    return users[1]?.id === loggedUser?.id ? users[1].name : users[1].name;
};

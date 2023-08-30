import { ChatState } from "@/context/chat-provider";
import { FC, useEffect } from "react";
import SingleChat from "./single-chat";

interface ChatBoxProps {
    fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox: FC<ChatBoxProps> = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();
  useEffect(()=>{
    console.log("selected chat",selectedChat)
  })
  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex items-center flex-col ml-2 p-12 border h-full w-full lg:w-4/6 `}
    >
      <SingleChat  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;

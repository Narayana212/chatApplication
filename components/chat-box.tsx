import { ChatState } from "@/context/chat-provider";
import { FC } from "react";
import SingleChat from "./single-chat";

interface ChatBoxProps {
    fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox: FC<ChatBoxProps> = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();
  return (
    <div
      className={`${
        selectedChat ? "none" : "none"
      } md:flex items-center flex-col ml-2 p-12 border h- w-full md:w-4/6 `}
    >
      <SingleChat  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;

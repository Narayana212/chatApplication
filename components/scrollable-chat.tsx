import { FC, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { ChatState } from "@/context/chat-provider";
import { isSameSender } from "@/helpers/is-same-sender";
import { isLastMessage } from "@/helpers/is-last-message";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { isSameUser } from "@/helpers/is-same-user";
import { isSameSenderMargin } from "@/helpers/is-same-sender-margin";

interface ScrollableChatProps {
  messages: Message[];
}

interface Message {
  _id: number;
  sender: {
    _id: number;
    pic: string;
    name: string;
    email:string;
  };
  content: string;
}

const ScrollableChat: FC<ScrollableChatProps> = ({ messages }) => {
  const { user } = ChatState();
  const [id,setId]=useState(0)
  async function getId(){
    const response=await fetch("api/users/id")
    if(response.ok){
      const data=await response.json()
      const {id}=data
      setId(id)
    }

  }
  useEffect(()=>{
    getId()
  })
  
  
  return (
    <ScrollArea className="h-full">
      {messages &&
        messages.map((m, i: number) => (
          <div className="flex" key={m._id}>
            <span
              className={`${
                m.sender._id === id
                  ? "bg-primary text-background"
                  : "bg-card"
              } ${isSameSender(messages, m, i, id) ? "mt-10" : "mt-3"}
              ml-${isSameSenderMargin(
                messages,
                m,
                i,
                id
              )}  rounded px-7 py-2 max-w-7/12`}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollArea>
  );
};

export default ScrollableChat;

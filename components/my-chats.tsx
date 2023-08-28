"use client";
import { ChatState } from "@/context/chat-provider";
import { FC, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { getSender } from "@/helpers/get-sender";
import { useToast } from "./ui/use-toast";

interface MyChatsProps {}
interface Chat {
    _id: string;
    isGroupChat: boolean;
    users: string[];
    chatName?: string;
    latestMessage?: {
      sender: {
        name: string;
      };
      content: string;
    };
  }

const MyChats: FC<MyChatsProps> = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    isOpen,
    setIsOpen,
  } = ChatState();
  const { toast } = useToast();
  async function fetchChats() {
    try {
      const response = await fetch("api/chats/single");
      const data = await response.json();
      if (response.ok) {
        setChats(data.message);
      } else {
        toast({
          title: data.message,
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  }

  useEffect(() => {
    console.log("rendering")
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo") || ""));
    fetchChats();
  }, [isOpen]);

  return (
    <div
      className={`${
        selectedChat ? "none" : "flex"
      } md:flex bg-card text-card-foreground  flex-col items-center p-3 w-full md:w-2/6 rounded `}
    >
      <div className="pb-3 px-3 text-xl flex w-full justify-between items-center">
        My Chats
      </div>
      <div className="flex flex-col p-3 border w-full h-full rounded-lg overflow-y-hidden">
        {chats ? (
          <ScrollArea>
            {chats.map((chat:Chat) => (
              <div
                onClick={() => setSelectedChat(chat)}
                className={` ${
                  selectedChat === chat ? " bg-background" : "bg-card"
                } cursor-pointer px-3 py-2 mt-2 border rounded-lg`}
                key={chat._id}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
                {chat.latestMessage && (
                  <p className="text-xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </p>
                )}
              </div>
            ))}
          </ScrollArea>
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default MyChats;

import { Forward, ForwardIcon, Heading1, Loader2, MoveLeft, Send, StepForward } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { ChatState } from "@/context/chat-provider";
import { getSender } from "@/helpers/get-sender";
import ScrollableChat from "./scrollable-chat";

import animationData from "./animations/typing.json";
import io from "socket.io-client";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import { Button } from "./ui/button";

interface SingleChatProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleChat: FC<SingleChatProps> = ({ fetchAgain, setFetchAgain }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  async function fetchMessages() {
    if (!selectedChat) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`api/messages?q=${selectedChat._id}`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessages(data.message);
        console.log("user",data.messages)
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
    setLoading(false);
  }

  async function sendMessage() {
    if (newMessage) {
      try {
        const response = await fetch("api/messages", {
          method: "POST",
          body: JSON.stringify({
            content: newMessage,
            chatId: selectedChat._id,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessages([...messages, data.message]);
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
      setNewMessage("");
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  return (
    <>
      {selectedChat ? (
        <>
          <h1 className="pb-3 px-2 text-lg w-full flex justify-between items-center">
            <MoveLeft
              className="flex md:none cursor-pointer"
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>{getSender(user, selectedChat.users)}</>
              ) : (
                <>{selectedChat.chatName.toUpperCase()}</>
              ))}
          </h1>
          <div className="flex flex-col justify-end w-full h-full ">
            {loading ? (
              <Loader2 className="m-auto animate-spin w-20 h-20 self-center" />
            ) : (
              <div className="flex flex-col  overflow-y-scroll">
                <ScrollableChat messages={messages} />
              </div>
            )}

            {istyping ? (
              <div>
                typing
              </div>
            ) : (
              <></>
            )}
            <div className="flex gap-2 items-center mt-3  ">
              <Input
                placeholder="Enter a message ..."
                value={newMessage}
                onChange={typingHandler}
                className="z-50 "
              />
              <Button onClick={sendMessage}>
                <Send/>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-xl pb-3"> Click on a user to start chatting</h1>
        </div>
      )}
    </>
  );
};

export default SingleChat;

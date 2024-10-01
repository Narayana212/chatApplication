"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

/**
 * Provides a context wrapper for chat-related state and functionality
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be wrapped
 * @returns {JSX.Element} A ChatContext.Provider component wrapping the children
 */
const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const router = useRouter();

  /**
   * React hook that checks for user authentication and sets user info
   * @param {Object} router - The Next.js router object
   * @returns {void} This hook doesn't return anything
   */
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) router.push("/login");
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        isOpen,
        setIsOpen,
        isDialogOpen,setIsDialogOpen
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

/**
 * A custom React hook that provides access to the chat state from the ChatContext.
 * @returns {Object} The current chat state from the ChatContext.
 */
export const ChatState = () => {
  const context = useContext(ChatContext);
  return context;
};

export default ChatProvider;

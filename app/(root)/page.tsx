"use client";
import ChatBox from "@/components/chat-box";
import MyChats from "@/components/my-chats";
import SideBar from "@/components/side-drawer";
import { ChatState } from "@/context/chat-provider";
import React, { useContext, useEffect, useState } from "react";

export default function Home() {
  const {user}=ChatState()
  console.log(user)
  
  return (
    <div className="pt-4 w-screen ">
      {<SideBar />}
      <div className="flex justify-between w-screen h-screen p-5">
        {<MyChats />}
        {<ChatBox />}
      </div>
    </div>
  );
}

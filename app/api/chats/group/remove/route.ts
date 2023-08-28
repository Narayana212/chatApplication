import { connect } from "@/lib/dbConfig";
import Chat from "@/models/chat-model";
import { NextRequest, NextResponse } from "next/server";


connect()
export async function PUT(request:NextRequest){
    const requestBody= await request.json()
    const {chatId,userId}=requestBody
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        
       if(!removed){
        return NextResponse.json({message:"Chat Not Found"},{status:404})
       }else{
        return NextResponse.json({message:removed},{status:200})

       }
}
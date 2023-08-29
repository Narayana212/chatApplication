import { getDataFromToken } from "@/helpers/get-data-from-token";
import { connect } from "@/lib/dbConfig";
import Message from "@/models/message-model";
import User from "@/models/user-model";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

connect()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const messages = await Message.find({ chat: searchParams.get("q") })
      .populate("sender", "name pic email")
      .populate("chat");
    console.log(messages)  
    return NextResponse.json({ message: messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(request) {
  const responseBody = await request.json();
  const { content, chatId } = responseBody;
  const { id } = getDataFromToken(request);
  console.log(chatId, content);
  if (!content || !chatId) {
    return NextResponse.json(
      { message: "Invalid data passed into request" },
      { status: 400 }
    );
  }
  var newMessage = {
    sender: id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await Message.populate(message, [
      { path: "sender", select: "name pic" },
      { path: "chat", populate: { path: "users", select: "name pic email" } },
    ]);

    

    
    console.log(message);
    return NextResponse.json({ message: message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

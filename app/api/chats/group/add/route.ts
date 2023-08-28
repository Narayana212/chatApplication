import { connect } from "@/lib/dbConfig";
import Chat from "@/models/chat-model";
import { NextRequest, NextResponse } from "next/server";


connect()
export async function PUT(request: NextRequest) {
    const requestBody = await request.json()
    const { chatId, userId } = requestBody
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        return NextResponse.json({ message: "Chat Not Found" }, { status: 404 })
    } else {
        return NextResponse.json({ message: added }, { status: 200 })

    }
}
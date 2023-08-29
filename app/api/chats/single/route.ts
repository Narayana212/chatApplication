import { getDataFromToken } from "@/helpers/get-data-from-token"
import { connect } from "@/lib/dbConfig"
import Chat from "@/models/chat-model"
import User from "@/models/user-model"
import { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

connect()
//access chats
export async function POST(request: NextRequest) {
    const requestBody = await request.json()
    const { userId } = requestBody
    const decodedToken = getDataFromToken(request)
    const { id } = decodedToken as JwtPayload;
    
    if (!id) {
        return NextResponse.json({ message: "Invalid to send " }, { status: 400 })

    }
    if (!userId) {
        return NextResponse.json({ message: "Invalid to send " }, { status: 400 })
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate("users", "-password")
        .populate("latestMessage")
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        return NextResponse.json({ message: isChat[0] }, { status: 200 })

    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [id, userId]
        };

        try {
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users", "-password"
            );
            return NextResponse.json({ message: FullChat }, { status: 200 })

        } catch (error: any) {
            return NextResponse.json({ message: error.message }, { status: 400 })

        }


    }
}


//Fetch all chats for a user

export async function GET(request: NextRequest) {
    try {
        const decodedToken = getDataFromToken(request)
        const { id } = decodedToken as JwtPayload;
        const results = await Chat.find({ users: { $elemMatch: { $eq: id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })

        const populatedResults = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email"
        });

        return NextResponse.json({ message: populatedResults }, { status: 200 });



    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}



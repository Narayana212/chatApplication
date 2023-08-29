import { getDataFromToken } from "@/helpers/get-data-from-token";
import { connect } from "@/lib/dbConfig";
import Chat from "@/models/chat-model";
import User from "@/models/user-model";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
connect()

//create a new group
export async function POST(request: NextRequest) {
    const requestBody = await request.json();
    var { users,groupname } = requestBody
    console.log(users,groupname)

    if (!users || !groupname) {
        return NextResponse.json({ message: "Please Fill all the fields" })
    }
    
    if (users.length < 2) {
        return NextResponse.json({ message: "More than 2 users are required to form a group chat" }, { status: 400 })
    }
    const decodedToken = getDataFromToken(request)
    const { email } = decodedToken as JwtPayload
    const existingUser = await User.findOne({ email })
    users.push(existingUser)
    

    try {
        const groupChat = await Chat.create({
            chatName: groupname,
            users: users,
            isGroupChat: true,
            groupAdmin: existingUser
        });
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        return NextResponse.json({ message: fullGroupChat }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: error }, { status: 400 })

    }
}


//rename a group 

export async function PUT(request: NextRequest) {

    const responseBody = await request.json()
    const { chatId, chatName } = responseBody
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        return NextResponse.json({ message: "Chat Not Found" }, { status: 404 })
    } else {
        return NextResponse.json({ message: updatedChat }, { status: 200 });
    }




}
import User from "@/models/user-model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt"
import { connect } from "@/lib/dbConfig";

connect()
export async function POST(request: NextRequest) {
    const requestBody = await request.json()
    const { username, email, password} = requestBody
    console.log(username, email, password)
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name:username, email, password:hashedPassword
        })
        return NextResponse.json(
            { message: "Registered Successfully" },
            { status: 200 }
        );


    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
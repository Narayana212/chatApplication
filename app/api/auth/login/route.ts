import User from "@/models/user-model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connect } from "@/lib/dbConfig";


connect()
export async function POST(request: NextRequest) {
    const requestBody = await request.json()
    const { email, password } = requestBody
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return NextResponse.json({ message: "The Email is Not Registered" }, { status: 400 });

        }
        const isPassword = await bcrypt.compare(password, existingUser.password);
        if (isPassword) {
            const payload = { id: existingUser._id, email: email, password: password };
            const jwtToken = jwt.sign(payload, "that_is_secret");
            const response = NextResponse.json(
                { message: "Login Successfull" },
                { status: 200 }
            );
            response.cookies.set("token", jwtToken, {
                httpOnly: true,
            });
            
            return response;
            
        } else {
            return NextResponse.json({ message: "Your Password is wrong" }, { status: 400 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "SomeThing went wrong" },
            { status: 500 }
        );
    }
}
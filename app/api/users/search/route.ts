import { getDataFromToken } from "@/helpers/get-data-from-token"
import { connect } from "@/lib/dbConfig"
import User from "@/models/user-model"
import { NextRequest, NextResponse} from "next/server"

connect()
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("search") ? {
        $or: [
            { name: { $regex: searchParams.get("search"), $options: "i" } },
            { email: { $regex: searchParams.get("search"), $options: "i" } },
        ]
    }
        : {};

    const users =await User.find(query)

    return NextResponse.json({message:users},{status:200})
    

    
}
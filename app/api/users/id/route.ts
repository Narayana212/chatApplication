import { getDataFromToken } from "@/helpers/get-data-from-token";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const decodedToken = getDataFromToken(request)
    const { id } = decodedToken as JwtPayload;
    return NextResponse.json({id},{status:200})
}
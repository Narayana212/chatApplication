import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken=(request:NextRequest)=>{
    try{
        const jwtToken=request.cookies.get("token")?.value || ""
        const decodedToken=jwt.verify(jwtToken,"that_is_secret")
        return decodedToken
    }catch(error:any){
        console.log(error.message)
    }
}
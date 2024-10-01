import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * Extracts and verifies data from a JWT token in the request cookies
 * @param {NextRequest} request - The Next.js request object containing cookies
 * @returns {Object|null} The decoded token data if successful, null if decoding fails
 */
export const getDataFromToken = (request: NextRequest) => {
    try {
        const jwtToken = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(jwtToken, "that_is_secret");
        return decodedToken;
    } catch (error: any) {
        console.log("Failed to decode token:", error.message);
        return null;
    }
};

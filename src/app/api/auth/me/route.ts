import { type NextRequest, NextResponse } from "next/server";
import { LoginDto } from "@/dtos";
import { cookies } from "next/headers";
import { loginSchema } from "@/schemas";
import { toLoginResponseDto } from "@/mappers";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session");
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const endpoint = process.env.AUTH_API_URL;
    const response = await fetch(`${endpoint}/auth/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token.value}`,
        },
        credentials: "include",
    });
    if (!response.ok) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = await response.json();
    return NextResponse.json(toLoginResponseDto(data));
}

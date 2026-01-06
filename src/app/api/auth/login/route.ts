import { type NextRequest, NextResponse } from "next/server";
import { LoginDto } from "@/dtos";
import { cookies } from "next/headers";
import { loginSchema } from "@/schemas";
import { toLoginResponseDto } from "@/mappers";

export async function POST(request: NextRequest) {
    const body = await request.json() as LoginDto;
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const { username, password } = parsed.data;
    if (!username || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const endpoint = process.env.AUTH_API_URL;
    const response = await fetch(`${endpoint}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        return NextResponse.json({ error: response }, { status: response.status });
    }
    const data = await response.json();

    const cookieStore = await cookies();
    cookieStore.set({
        name: "session",
        value: data.accessToken,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });

    cookieStore.set({
        name: "refresh",
        value: data.refreshToken,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });
    return NextResponse.json(toLoginResponseDto(data));
}

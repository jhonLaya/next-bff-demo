import { NextResponse } from "next/server";
import { toUserDto } from "@/mappers";
import { usersSchema } from "@/schemas";
import { User } from "@/dtos";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageSize = searchParams.get("results");
    const endpoint = process.env.USERS_API;
    const response = await fetch(`${endpoint}?results=${pageSize}`);
    if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
    const data = await response.json();
    const users = data.results
        .map((user: unknown) => {
            const parsed = usersSchema.safeParse(user);
            if (!parsed.success) return null;
            return toUserDto(parsed.data);
        })
        .filter((user: User | null) => user !== null);
    return NextResponse.json(users);
}
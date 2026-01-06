"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMe } from "@/services/auth.services";
import type { LoginResponseDto } from "@/dtos";

export default function MePage() {
    const router = useRouter();
    const [user, setUser] = useState<LoginResponseDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe();
                setUser(data);
            } catch (err) {
                setError("No autorizado");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <p className="text-zinc-500">Cargando...</p>
            </main>
        );
    }

    if (error || !user) {
        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <p className="text-red-400">{error}</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center gap-4">
                    <img
                        src={user.image}
                        alt={user.username}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <h1 className="text-2xl font-semibold">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-zinc-500">@{user.username}</p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex justify-between border-b border-zinc-200 pb-2">
                        <span className="text-zinc-500">Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-200 pb-2">
                        <span className="text-zinc-500">Género</span>
                        <span className="capitalize">{user.gender}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-200 pb-2">
                        <span className="text-zinc-500">ID</span>
                        <span>{user.id}</span>
                    </div>
                </div>

                <Link
                    href="/users"
                    className="mt-6 block text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                    Volver
                </Link>
            </div>
        </main>
    );
}


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginDto, LoginResponseDto } from "@/dtos";
import { login } from "@/services/auth.services";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginDto>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(formData.username, formData.password);
            router.push("/users");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center  p-4">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center mb-8">
                    Iniciar Sesión
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm text-zinc-400 mb-1">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-zinc-800 rounded-lg  placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="tu_usuario"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm text-zinc-400 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-zinc-800 rounded-lg  placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                    >
                        {loading ? "Cargando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </main>
    );
}


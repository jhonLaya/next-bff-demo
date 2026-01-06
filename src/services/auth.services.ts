export const login = async (username: string, password: string) => {
    const response = await fetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        throw new Error("Failed to login");
    }
    return response.json();
};

export const getMe = async () => {
    const response = await fetch(`/api/auth/me`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Unauthorized");
    }
    return response.json();
};
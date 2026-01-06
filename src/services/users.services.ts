export const getUsers = async (pageSize: number) => {
    const endopoint = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`/api/users?results=${pageSize}`);
    console.log(response);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
};
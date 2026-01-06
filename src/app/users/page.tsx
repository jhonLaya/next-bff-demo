"use client";
import { Cards } from "@/components";
import { User } from "@/dtos";
import { getUsers } from "@/services";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Users() {
    const [pageSize, setPageSize] = useState(25);
    const [users, setUsers] = useState<User[]>([]);
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(parseInt(event.target.value));
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers(pageSize);
            setUsers(users);
        };
        fetchUsers();
    }, [pageSize]);


    return (
        <div className="flex flex-col items-center justify-center pt-5">
            <select 
                onChange={handleChange} 
                value={pageSize}
                id="pageSize"
                name="pageSize"
                className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-slate-600 
                        hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 
                        focus:outline-none cursor-pointer transition-all duration-200 
                        font-medium text-sm shadow-lg backdrop-blur-sm
                        bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%239ca3af%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] 
                        bg-[length:12px] bg-[right_12px_center] bg-no-repeat"
            >
                <option value="25">25 usuarios</option>
                <option value="50">50 usuarios</option>
                <option value="75">75 usuarios</option>
                <option value="100">100 usuarios</option>
            </select>

            <Link
                href="/users/me"
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
                Mi perfil
            </Link>
            
            <div className="flex flex-wrap items-center justify-center">
                {users.map((user: User, index: number) => (
                    <Cards key={index} title={`${user.firstName} ${user.lastName}`} description={user.email} image={user.image} />
                ))}
            </div>
        </div>
    );
}
import { User } from "@/dtos";
import { UsersSchema } from "@/schemas";

export const toUserDto = (user: UsersSchema): User | null => {
    try {
        return {
            id: user.id.value,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            image: user.picture.large,
        };
    } catch {
        return null;
    }
};
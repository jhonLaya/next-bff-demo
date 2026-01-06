import { LoginResponseSchema, loginResponseSchema } from "@/schemas";
import { LoginResponseDto } from "@/dtos";

export const toLoginResponseDto = (data: LoginResponseSchema): LoginResponseDto | null => {
    try {
        return {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image,
        };
    } catch {
        return null;
    }
};
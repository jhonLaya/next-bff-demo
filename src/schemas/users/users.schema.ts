import { z } from "zod";

export const usersSchema = z.object({
    id: z.object({
        value: z.string().nullable(),
    }),
    name: z.object({
        first: z.string(),
        last: z.string(),
    }),
    email: z.string(),
    picture: z.object({
        large: z.string(),
        medium: z.string(),
        thumbnail: z.string(),
    }),
});

export type UsersSchema = z.infer<typeof usersSchema>;

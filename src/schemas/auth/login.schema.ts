import { z } from "zod";

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const loginResponseSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    image: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
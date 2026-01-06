export type LoginDto = {
    username: string;
    password: string;
}

export type LoginResponseDto = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}
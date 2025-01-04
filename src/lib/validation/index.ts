import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, {message: 'Name is too short'}).max(50, {message: 'Name is too long'}),
    username: z.string().min(2, {message: 'username is too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}), 
})
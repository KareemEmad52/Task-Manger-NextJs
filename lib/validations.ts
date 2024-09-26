import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email must be valid. "),
  password: z
    .string()
    .min(1, "Password is reqierd")
    .regex(/^[A-za-z0-9]{6,}$/, "Password must be at least 6 charcters"),
});

export const registerFromSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 charecters"),
  email: z.string().min(1, "Email is required").email("Email must be valid. "),
  password: z
    .string()
    .min(1, "Password is reqierd")
    .regex(/^[A-za-z0-9]{6,}$/, "Password must be at least 6 charcters"),
  gender: z.enum(["male", "female"], { message: "Must select your gender" }),
});


export const addTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["in-progress", "completed"], { message: "Must select your status" }),
  deadline: z.date({message: "Deadline is Required"}),
});

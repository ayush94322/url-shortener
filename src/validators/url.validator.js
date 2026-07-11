import {z} from "zod";

export const createUrlSchema = z.object({
    url: z.url("Please provide a valid URL"),
    customAlias: z
        .string()
        .min(3)
        .max(20)
        .regex(/^[a-zA-Z0-9_-]+$/)
        .optional(),
    expiresAt: z
        .string()
        .datetime()
        .optional()
});
import { z } from "zod";

export const createUrlSchema = z.object({
  url: z.url("Please provide a valid URL"),
  customAlias: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
  expiresAt: z.string().datetime().optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().min(1).max(100).default(100),
});

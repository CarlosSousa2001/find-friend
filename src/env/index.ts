import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production", "dev"]).default("dev"),
    PORT: z.string().regex(/^\d+$/).transform(Number),
    DATABASE_URL: z.string().url(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error("Invalid environment variables:", env.error.format());

    throw new Error("Invalid environment variables");
}

export const config = env.data;
import { config } from "@/env"
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
    log: config.NODE_ENV === "dev" ? ["query"] : []
})
import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import crypto from "node:crypto";
import { registerUseCase } from "@/use-cases/register";

export async function register(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        whatsapp: z.string().min(10),

        address: z.object({
            zip: z.string(),
            city: z.string(),
            street: z.string(),

            logitude: z.number(),
            latitude: z.number(),
        }),
    })

    const { name, email, password, whatsapp, address: { city, latitude, logitude, street, zip } } = registerBodySchema.parse(request.body);

    try {
        await registerUseCase({ name, email, password, whatsapp, address: { city, latitude, logitude, street, zip } })
    } catch (error: any) {
        return reply.status(400).send({ error: error.message })
    }


    return reply.status(201).send()
}
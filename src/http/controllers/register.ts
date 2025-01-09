import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

export async function register(request: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        whatsapp: z.string().min(10),

        addresses: z.object({
            zip: z.string(),
            city: z.string(),
            street: z.string(),

            longitude: z.number(),
            latitude: z.number(),
        }),
    })

    const { name, email, password, whatsapp, addresses: { city, latitude, longitude, street, zip } } = registerBodySchema.parse(request.body);

    try {

        const prismaOrgsRepository = new PrismaOrgsRepository()

        const registerUseCase = new RegisterUseCase(prismaOrgsRepository)

        await registerUseCase.execute({ name, email, password, whatsapp, addresses: { city, longitude, latitude, street, zip } })
    } catch (error: any) {
        return reply.status(400).send({ error: error.message })
    }


    return reply.status(201).send()
}
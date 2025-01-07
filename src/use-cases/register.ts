import { prisma } from "@/lib/prisma";
import crypto from "node:crypto";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
    whatsapp: string;
    address: {
        zip: string;
        city: string;
        street: string;
        logitude: number;
        latitude: number;
    }
}

export async function registerUseCase({ name, email, password, whatsapp, address: { city, latitude, logitude, street, zip } }: RegisterUseCaseRequest) {

    function generatePassword(password: string) {
        const salt = crypto.randomBytes(32).toString("hex")
        const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
        return {
            salt: salt,
            hash: genHash
        }
    }
    function validPassword(password: string, hash: string, salt: string) {
        const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex")
        return hash === checkHash
    }

    const { hash } = generatePassword(password);

    const orgWithSameEmail = await prisma.org.findUnique({
        where: {
            email
        }
    })

    if (orgWithSameEmail) {
        throw new Error("Email already in use")
    }

    await prisma.org.create({
        data: {
            name,
            email,
            password: hash,
            whatsapp,
            addresses: {
                create: {
                    city,
                    latitude,
                    logitude,
                    street,
                    zip,
                }
            }
        }
    })
}
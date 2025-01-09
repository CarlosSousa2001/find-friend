import { prisma } from "@/lib/prisma";
import { OrgsRepository, OrgsRepositoryInput, OrgsRepositoryResponse } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {

    async create(data: OrgsRepositoryInput) {
        const org = await prisma.org.create({
            data: {
                ...data,
                addresses: {
                    create: {
                        ...data.addresses,
                    },
                },
            },
        });

        return {
            ...org,
            addresses: data.addresses
        };
    }

    async findByEmail(email: string): Promise<OrgsRepositoryResponse | null> {
        const org = await prisma.org.findUnique({
            where: {
                email,
            },
            include: {
                addresses: true
            }
        });

        if (!org) {
            return null;
        }

        return {
            name: org.name,
            email: org.email,
            password: org.password,
            whatsapp: org.whatsapp,
            addresses: org.addresses.map(address => ({
                zip: address.zip,
                city: address.city,
                street: address.street,
                longitude: Number(address.longitude),
                latitude: Number(address.latitude)
            })),
        };
    }
}
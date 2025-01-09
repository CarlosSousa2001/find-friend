import { OrgsRepository, OrgsRepositoryInput } from "@/repositories/orgs-repository";
import crypto from "node:crypto";

export class RegisterUseCase {

    private orgsRepository: OrgsRepository;

    constructor(
        orgsRepository: OrgsRepository
    ) {
        this.orgsRepository = orgsRepository;
    }

    async execute({ name, email, password, whatsapp, addresses: { city, latitude, longitude, street, zip } }: OrgsRepositoryInput) {

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

        const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

        if (orgWithSameEmail) {
            throw new Error("Email already in use")
        }

        await this.orgsRepository.create({
            name,
            email,
            password: hash,
            whatsapp,
            addresses: {
                zip,
                city,
                street,
                longitude,
                latitude
            }
        })
    }
}


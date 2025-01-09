export interface OrgsRepositoryInput {
    name: string;
    email: string;
    password: string;
    whatsapp: string;
    addresses: {
        zip: string;
        city: string;
        street: string;
        longitude: number;
        latitude: number;
    }
}

export interface OrgsRepositoryResponse {
    name: string;
    email: string;
    password: string;
    whatsapp: string;
    addresses: {
        zip: string;
        city: string;
        street: string;
        longitude: number;
        latitude: number;
    }[]
}

export interface OrgsRepository {
    create(data: any): Promise<OrgsRepositoryInput>;
    findByEmail(email: string): Promise<OrgsRepositoryResponse | null>;
}
import { Language } from "@prisma/client";

export interface RegistrationInterface {
    language?: Language;
    name?: string;
    birthday?: string;
    nationality?: string;
    workplace?: string;
    address?: string;
    telephone?: string;
}

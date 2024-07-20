import { Request as ExpressRequest } from 'express';

declare module 'express' {
    interface Request extends ExpressRequest {
        tenant?: string; // Adiciona o novo atributo 'tenant'
    }
}
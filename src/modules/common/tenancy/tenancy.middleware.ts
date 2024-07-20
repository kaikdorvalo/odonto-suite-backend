import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const subdomain = req.headers.host.split('.')[0]
        const tenant = subdomain;
        if (!tenant) {
            return res.status(400).send('Tenant is missing');
        }
        req['tenant'] = tenant;
        next();
    }
}
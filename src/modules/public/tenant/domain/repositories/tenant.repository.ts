import { EntityManager, Repository } from 'typeorm'
import { Tenant } from '../entities/tenant.entity'

export interface TenantRepository extends Repository<Tenant> {
    createSchema(name: string, manager: EntityManager): any

    createTenant(tenant: Tenant, manager: EntityManager): Promise<Tenant>

    findById(id: number): Promise<Tenant | null>

    findByName(name: string): Promise<Tenant | null>
}
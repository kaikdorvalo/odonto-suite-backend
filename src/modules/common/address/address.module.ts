import { Module } from "@nestjs/common";
import { AddressController } from "./presentation/controllers/address.controller";
import { AddressService } from "./domain/services/address.service";
import { Repositories } from "src/common/constants/respositories.constants";
import { AddressRepositoryImpl } from "./infrastructure/persistence/address.repository.impl";
import { DatabaseModule } from "../database/database.module";

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        AddressService,
        {
            provide: Repositories.ADDRESS_REPOSITORY,
            useClass: AddressRepositoryImpl
        }
    ],
    controllers: [
        AddressController
    ],
})
export class AddressModule { }
import { IsString, MinLength } from "class-validator";

export class CreateTenantDto {

    @MinLength(3)
    @IsString()
    name: string;
}
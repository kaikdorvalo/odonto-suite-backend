import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateTenantDto {

    @MinLength(3)
    @IsString()
    @ApiProperty({
        description: 'Tenant name'
    })
    name: string;
}
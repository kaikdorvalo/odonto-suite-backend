import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTenantDto {

    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Tenant name'
    })
    name: string;
}
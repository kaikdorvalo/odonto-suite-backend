import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserSignInDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User email'
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User password'
    })
    password: string;
}
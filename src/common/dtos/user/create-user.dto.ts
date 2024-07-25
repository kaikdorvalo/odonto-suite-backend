import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User first name'
    })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User last name'
    })
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User cpf'
    })
    cpf: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'User email address'
    })
    email: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User date of birth'
    })
    dateOfBirth: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User password'
    })
    password: string;
}


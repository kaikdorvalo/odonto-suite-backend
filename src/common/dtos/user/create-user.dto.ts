import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User first name'
    })
    @MinLength(3)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User last name'
    })
    @MinLength(3)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User cpf'
    })
    @MinLength(11)
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
    @MinLength(8)
    password: string;
}


import { Body, Controller, Get, HttpStatus, Post, Request, UseFilters } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { CreateUserDto } from 'src/common/dtos/user/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/exception-filters/http-exception.filter';
import { Errors } from 'src/common/enums/errors/errors.enum';

@ApiTags('users')
@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(
    private readonly userService: UserService,

    private readonly createUserUseCase: CreateUserUseCase
  ) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: Errors.USER_ALREADY_EXISTS })
  async createUser(@Body() createUser: CreateUserDto) {
    const createdUser = await this.createUserUseCase.execute(createUser);
    return createdUser;
  }
}

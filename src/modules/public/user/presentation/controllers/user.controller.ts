import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  sayHello(@Request() req) {
    return this.userService.sayHello();
  }

}

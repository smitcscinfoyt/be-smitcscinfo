import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post('/create')
  createUser() {
    // Logic to create a user will go here
    return { message: 'User created successfully' };
  }
}

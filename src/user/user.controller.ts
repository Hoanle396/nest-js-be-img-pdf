import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      console.log("e")
      return await this.userService.login(createUserDto);
    }
    catch (error) {
      console.log(error)
    }
    
  }

}

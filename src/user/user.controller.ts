import { Controller, Get, Post, Body, HttpStatus, UseGuards, Request, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async postLogin(@Body() createUserDto: CreateUserDto,@Res() res:Response) {
    try {
      const data = await this.userService.login(createUserDto)
      if(data){
        return res.status(HttpStatus.OK).send(data);
      }
      else {
        return res.status(HttpStatus.BAD_REQUEST).send({"message":"Authorized !"})
     }
    }
    catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req:any) {
    console.log(req)
    return req.user;
  }
}

import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import loginAdminDto from './dto/login-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post("/login")
  async login(@Body()admin:loginAdminDto,@Res() res:Response){
    try {
      const data = await this.adminService.login(admin)
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
  @Get('/feedback')
  async feedback(){
    return await this.adminService.getFeedback();
  }
  @Get('/user')
  async user(){
    return await this.adminService.getUser();
  }
}

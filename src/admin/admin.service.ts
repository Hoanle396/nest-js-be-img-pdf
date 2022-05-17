import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import loginAdminDto from './dto/login-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
   constructor(
      @InjectRepository(Admin) private userRepository: Repository<Admin>,
      @InjectRepository(Feedback) private feedbackRepository: Repository<Feedback>,
      @InjectRepository(User) private clientRepository: Repository<User>,
      private jwtService: JwtService,
   ){
 
   }
   async login(admin:loginAdminDto) {
      const user = await this.userRepository.findOne({username: admin.username,password: admin.password});
      if(user) {
         return this.payload(user)
      }
   }
   async payload(user:Admin){
      const payload = { id :user.id,username : user.username}
      return { token: this.jwtService.sign(payload)}
   }
   async getFeedback(){
      return await this.feedbackRepository.find();
   }
   async getUser(){
      return await this.clientRepository.find();
   }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {google} from 'googleapis'

const {OAuth2}= google.auth
const client = new OAuth2(process.env.CILENT_ID)
@Injectable()
export class UserService {

  constructor( @InjectRepository(User) private userRepository: Repository<User>){

  }
  register(user: User) {
    
    return this.userRepository.save(user)
  }
  async login(createUserDto: CreateUserDto) {
    const user=await this.userRepository.findOne({ email: createUserDto.email})
    if (user){
      return "oke"
    }
    else{
      try{
        const res = await client.verifyIdToken({idToken:createUserDto.idToken})
        const newUser= new User();
        newUser.fullName=res.getPayload().name;
        newUser.email=res.getPayload().email;
        newUser.photoUrl=res.getPayload().picture;
        newUser.isVerify=true
        return this.register(newUser)
      }
      catch (err) {
        
      }
      // const user=new User();
    //   user.fullName=respone.name
    // user.email=createUserDto.email
    // user.photoUrl=createUserDto.photoUrl
      return "ok"
  }
 }
}

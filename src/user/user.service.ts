import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {JwtService} from '@nestjs/jwt';
import { User } from './entities/user.entity';
import {google} from 'googleapis'
import https from 'axios';
import md5 from 'blueimp-md5';
const {OAuth2}= google.auth
const client = new OAuth2(process.env.CILENT_ID)
@Injectable()
export class UserService {

  constructor(
     @InjectRepository(User) private userRepository: Repository<User>,
     private jwtService: JwtService
  ){

  }
  async register(user: User) {
    var instance= await https.post('http://intense-atoll-99172.herokuapp.com/api/insert',{key:md5(user.email)},{headers:{Authorization:process.env.AUTHKEY}})
    .then(() => 1 )
    .catch(()=>{return})
    if(instance==1){
      user.key=md5(user.email)
      return this.userRepository.save(user)
    }
    return
  }
  async login(createUserDto: CreateUserDto) {
    const user=await this.userRepository.findOne({ email: createUserDto.email})
    if (user){
      return await this.Payload(user)
    }
    else{
      try{
        const res = await client.verifyIdToken({idToken:createUserDto.idToken})
        const newUser= new User();
        newUser.fullName=res.getPayload().name;
        newUser.email=res.getPayload().email;
        newUser.photoUrl=res.getPayload().picture;
        newUser.isVerify=true
        const data= await this.register(newUser)
        if(data){
          return await this.Payload(data)
        }
        else{
          throw new BadRequestException({"message":"Server Error!"})
        }
      }
      catch (err) {
        return 
      }
    }
 }
 async  Payload(user:User){
  const payload = { 
    id :user.id,
    fullName:user.fullName,
    email: user.email, 
    photoUrl: user.photoUrl,
    isVerify: user.isVerify
    };
     return {
       access_token: this.jwtService.sign(payload),
       key: user.key
    };
}
}

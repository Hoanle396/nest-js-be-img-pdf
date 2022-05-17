import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { Feedback } from './entities/feedback.entity';
import { Token } from './entities/token-regis.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback) private feedbackRepository:Repository<Feedback>,
    @InjectRepository(Token) private tokenRepository:Repository<Token>
    ){}
  create(createFeedbackDto: CreateFeedbackDto) {
     return this.feedbackRepository.save(createFeedbackDto)
  }

  async insert(token:CreateTokenDto){
    return await this.tokenRepository.save(token)
  }

  async findAll() {
    return await this.tokenRepository.createQueryBuilder('token')
    .select('token.token', 'token').getRawMany()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} feedback`;
  // }

  // update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
  //   return `This action updates a #${id} feedback`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} feedback`;
  // }
}

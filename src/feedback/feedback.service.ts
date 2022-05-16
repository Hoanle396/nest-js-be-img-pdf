import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback) private feedbackRepository:Repository<Feedback>){

  }
  create(createFeedbackDto: CreateFeedbackDto) {
     return this.feedbackRepository.save(createFeedbackDto)
  }

  // findAll() {
  //   return `This action returns all feedback`;
  // }

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

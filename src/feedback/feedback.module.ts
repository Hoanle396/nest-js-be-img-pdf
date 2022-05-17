import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Token } from './entities/token-regis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Feedback,Token
  ])],
  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule {}

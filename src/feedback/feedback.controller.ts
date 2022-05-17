import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { SendFeedbackDto } from './dto/send-feedback.dto';
var FCM = require('fcm-node');


var fcm = new FCM(process.env.NOTIFICATION_KEY||"AIzaSyA50XDo__a7PEBqS0bXbQQMyiU7rLEM4mQ");
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }
  @Post("/send")
  async send(@Body() sendFeedbackDto: SendFeedbackDto) {
    
    var message = { 
      to: '/topics/com.example.pdf', 
      
      notification: {
          title: sendFeedbackDto.title, 
          body: sendFeedbackDto.body
      },
  };
    return await fcm.send(message, function(err, response){
      if (err) {
          console.log(err);
      } else {
          console.log("Successfully sent with response: ", response);
      }
  });
  }

  // @Get()
  // findAll() {
  //   return this.feedbackService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.feedbackService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
  //   return this.feedbackService.update(+id, updateFeedbackDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.feedbackService.remove(+id);
  // }
}

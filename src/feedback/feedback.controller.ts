import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { SendFeedbackDto } from './dto/send-feedback.dto';
import { CreateTokenDto } from './dto/create-token.dto';
var FCM = require('fcm-node');


var fcm = new FCM(process.env.NOTIFICATION_KEY||"AAAAGS3R0wQ:APA91bGjVg8HNywxRMsmras8P1YnIhyAQct04E--zKlz3VNRnUn-eJOfA0PiyBUsHFOwtYqr87ACI7Cf2TS6giFEyARPisy52XN4T-_lz0DU6jVIkibuQ0tNenOn5rs-M-Gx4WmBW0GF");
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
    var token = await this.feedbackService.findAll()
    var message = { 
      registration_ids: token.map(tokens => tokens.token), 
      // to:"dKcAsXlCBxQ:APA91bELwTNLOtSBOL5gXO8EElIIOEAVXvzO3i7PdWhDyF8gmlU7wwTfYXH5ARDCJNScvbED6ADOaV6UsjIIhMVjJKjR0bOJsbAQNr5uKyGf7JPxlCtRiSeS3gWdcsxRzJkvbnNg7Xjk",
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
  @Post("/insert")
  async insert(@Body() token: CreateTokenDto) {
    return await this.feedbackService.insert(token)
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

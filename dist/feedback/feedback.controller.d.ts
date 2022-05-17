import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { SendFeedbackDto } from './dto/send-feedback.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(createFeedbackDto: CreateFeedbackDto): Promise<CreateFeedbackDto & import("./entities/feedback.entity").Feedback>;
    send(sendFeedbackDto: SendFeedbackDto): Promise<any>;
}

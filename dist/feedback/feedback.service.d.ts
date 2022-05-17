import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { Feedback } from './entities/feedback.entity';
import { Token } from './entities/token-regis.entity';
export declare class FeedbackService {
    private feedbackRepository;
    private tokenRepository;
    constructor(feedbackRepository: Repository<Feedback>, tokenRepository: Repository<Token>);
    create(createFeedbackDto: CreateFeedbackDto): Promise<CreateFeedbackDto & Feedback>;
    insert(token: CreateTokenDto): Promise<CreateTokenDto & Token>;
    findAll(): Promise<any[]>;
}

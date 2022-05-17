import { JwtService } from '@nestjs/jwt';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import loginAdminDto from './dto/login-admin.dto';
import { Admin } from './entities/admin.entity';
export declare class AdminService {
    private userRepository;
    private feedbackRepository;
    private clientRepository;
    private jwtService;
    constructor(userRepository: Repository<Admin>, feedbackRepository: Repository<Feedback>, clientRepository: Repository<User>, jwtService: JwtService);
    login(admin: loginAdminDto): Promise<{
        token: string;
    }>;
    payload(user: Admin): Promise<{
        token: string;
    }>;
    getFeedback(): Promise<Feedback[]>;
    getUser(): Promise<User[]>;
}

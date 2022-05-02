import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(user: User): Promise<User>;
    login(createUserDto: CreateUserDto): Promise<any>;
    Payload(user: User): Promise<{
        access_token: string;
    }>;
}

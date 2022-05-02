import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    register(user: User): Promise<User>;
    login(createUserDto: CreateUserDto): Promise<User | "oke" | "ok">;
}

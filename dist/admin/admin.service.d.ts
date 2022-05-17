import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import loginAdminDto from './dto/login-admin.dto';
import { Admin } from './entities/admin.entity';
export declare class AdminService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<Admin>, jwtService: JwtService);
    login(admin: loginAdminDto): Promise<{
        token: string;
    }>;
    payload(user: Admin): Promise<{
        token: string;
    }>;
}

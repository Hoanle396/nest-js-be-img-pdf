import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    postLogin(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: any): any;
}

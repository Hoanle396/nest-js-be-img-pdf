import { Response } from 'express';
import { AdminService } from './admin.service';
import loginAdminDto from './dto/login-admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    login(admin: loginAdminDto, res: Response): Promise<Response<any, Record<string, any>>>;
    feedback(): Promise<import("../feedback/entities/feedback.entity").Feedback[]>;
    user(): Promise<import("../user/entities/user.entity").User[]>;
}

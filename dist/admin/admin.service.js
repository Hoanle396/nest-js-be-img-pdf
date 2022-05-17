"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const feedback_entity_1 = require("../feedback/entities/feedback.entity");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entities/admin.entity");
let AdminService = class AdminService {
    constructor(userRepository, feedbackRepository, clientRepository, jwtService) {
        this.userRepository = userRepository;
        this.feedbackRepository = feedbackRepository;
        this.clientRepository = clientRepository;
        this.jwtService = jwtService;
    }
    async login(admin) {
        const user = await this.userRepository.findOne({ username: admin.username, password: admin.password });
        if (user) {
            return this.payload(user);
        }
    }
    async payload(user) {
        const payload = { id: user.id, username: user.username };
        return { token: this.jwtService.sign(payload) };
    }
    async getFeedback() {
        return await this.feedbackRepository.find();
    }
    async getUser() {
        return await this.clientRepository.find();
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(feedback_entity_1.Feedback)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map
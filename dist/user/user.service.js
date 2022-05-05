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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./entities/user.entity");
const googleapis_1 = require("googleapis");
const node_fetch_1 = require("node-fetch");
const { OAuth2 } = googleapis_1.google.auth;
const client = new OAuth2(process.env.CILENT_ID);
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(user) {
        const { createHmac } = await Promise.resolve().then(() => require('crypto'));
        const hash = createHmac('md5', user.email).digest('hex');
        var instance = await (0, node_fetch_1.default)('http://intense-atoll-99172.herokuapp.com/api/insert', {
            method: 'POST',
            body: JSON.stringify({ key: hash }),
            headers: { 'Content-Type': 'application/json', Authorization: process.env.AUTHKEY }
        });
        const data = await instance.json();
        if (data.code == 200 || data.code == 201) {
            user.key = hash;
            return this.userRepository.save(user);
        }
    }
    async login(createUserDto) {
        const user = await this.userRepository.findOne({ email: createUserDto.email });
        if (user) {
            return await this.Payload(user);
        }
        else {
            try {
                const res = await client.verifyIdToken({ idToken: createUserDto.idToken });
                const newUser = new user_entity_1.User();
                newUser.fullName = res.getPayload().name;
                newUser.email = res.getPayload().email;
                newUser.photoUrl = res.getPayload().picture;
                newUser.isVerify = true;
                const data = await this.register(newUser);
                if (data) {
                    return await this.Payload(data);
                }
                else {
                    throw new common_1.BadRequestException({ "message": "Server Error!" });
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    async Payload(user) {
        const payload = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            photoUrl: user.photoUrl,
            isVerify: user.isVerify
        };
        return {
            access_token: this.jwtService.sign(payload),
            key: user.key
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
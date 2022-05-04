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
const axios_1 = require("axios");
const blueimp_md5_1 = require("blueimp-md5");
const { OAuth2 } = googleapis_1.google.auth;
const client = new OAuth2(process.env.CILENT_ID);
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(user) {
        var instance = await axios_1.default.post('http://intense-atoll-99172.herokuapp.com/api/insert', { key: (0, blueimp_md5_1.default)(user.email) }, { headers: { Authorization: process.env.AUTHKEY } })
            .then(() => 1)
            .catch(() => { return; });
        if (instance == 1) {
            user.key = (0, blueimp_md5_1.default)(user.email);
            return this.userRepository.save(user);
        }
        return;
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
                return;
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
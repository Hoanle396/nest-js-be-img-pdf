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
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const feedback_service_1 = require("./feedback.service");
const create_feedback_dto_1 = require("./dto/create-feedback.dto");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const send_feedback_dto_1 = require("./dto/send-feedback.dto");
const create_token_dto_1 = require("./dto/create-token.dto");
var FCM = require('fcm-node');
var fcm = new FCM(process.env.NOTIFICATION_KEY || "AAAAGS3R0wQ:APA91bGjVg8HNywxRMsmras8P1YnIhyAQct04E--zKlz3VNRnUn-eJOfA0PiyBUsHFOwtYqr87ACI7Cf2TS6giFEyARPisy52XN4T-_lz0DU6jVIkibuQ0tNenOn5rs-M-Gx4WmBW0GF");
let FeedbackController = class FeedbackController {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    create(createFeedbackDto) {
        return this.feedbackService.create(createFeedbackDto);
    }
    async send(sendFeedbackDto) {
        var token = await this.feedbackService.findAll();
        var message = {
            registration_ids: token.map(tokens => tokens.token),
            notification: {
                title: sendFeedbackDto.title,
                body: sendFeedbackDto.body
            },
        };
        return await fcm.send(message, function (err, response) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
    async insert(token) {
        return await this.feedbackService.insert(token);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_feedback_dto_1.CreateFeedbackDto]),
    __metadata("design:returntype", void 0)
], FeedbackController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/send"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_feedback_dto_1.SendFeedbackDto]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "send", null);
__decorate([
    (0, common_1.Post)("/insert"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_token_dto_1.CreateTokenDto]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "insert", null);
FeedbackController = __decorate([
    (0, common_1.Controller)('feedback'),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService])
], FeedbackController);
exports.FeedbackController = FeedbackController;
//# sourceMappingURL=feedback.controller.js.map
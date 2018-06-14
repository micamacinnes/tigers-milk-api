"use strict";
// Uncomment these imports to begin using these cool features!
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
// import {inject} from @loopback/context;
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const payment_methods_1 = require("../models/payment-methods");
const payment_methods_repository_1 = require("../repositories/payment-methods.repository");
let PaymentMethodsController = class PaymentMethodsController {
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
    }
    async getPaymentMethod() {
        return await this.paymentRepo.find();
    }
    async newPaymentMethod(payment_method) {
        if (!payment_method.user_id || !payment_method.card_number ||
            !payment_method.security_code || !payment_method.exp_date) {
            throw new rest_1.HttpErrors.Unauthorized('missing data');
        }
        let paymentExists = !!(await this.paymentRepo.count({ user_id: payment_method.user_id }));
        if (paymentExists) {
            throw new rest_1.HttpErrors.BadRequest('payment method already exists');
        }
        return await this.paymentRepo.create(payment_method);
    }
};
__decorate([
    rest_1.get('payment-methods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "getPaymentMethod", null);
__decorate([
    rest_1.post('payment-methods'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_methods_1.PaymentMethod]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "newPaymentMethod", null);
PaymentMethodsController = __decorate([
    __param(0, repository_1.repository(payment_methods_1.PaymentMethod.name)),
    __metadata("design:paramtypes", [payment_methods_repository_1.PaymentMethodsRepository])
], PaymentMethodsController);
exports.PaymentMethodsController = PaymentMethodsController;
//# sourceMappingURL=payment-methods.controller.js.map
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
const users_repository_1 = require("../repositories/users.repository");
const rest_1 = require("@loopback/rest");
// import { User } from "../models/user";
const jsonwebtoken_1 = require("jsonwebtoken");
const donations_repository_1 = require("../repositories/donations.repository");
const role_map_repository_1 = require("../repositories/role-map.repository");
const payment_methods_repository_1 = require("../repositories/payment-methods.repository");
let UsersController = class UsersController {
    constructor(userRepo, donationsRepo, paymentMethodRepo, roleMapRepo) {
        this.userRepo = userRepo;
        this.donationsRepo = donationsRepo;
        this.paymentMethodRepo = paymentMethodRepo;
        this.roleMapRepo = roleMapRepo;
    }
    async getAllUsers(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtBody);
            return jwtBody;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required');
        }
        // return await this.userRepo.find();
    }
    //http://localhost:3000/me?jwt=thetoken
    async getMe(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required');
        try {
            var jwtUser = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtUser);
            return jwtUser;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required');
        }
    }
    async getDonationsByID(user_id) {
        let userExists = !!(await this.donationsRepo.count({ user_id: user_id }));
        if (userExists) {
            throw new rest_1.HttpErrors.BadRequest(`user_id ${user_id} does not have any donations`);
        }
        return await this.donationsRepo.find({
            where: {
                user_id: user_id
            }
        });
    }
};
__decorate([
    rest_1.get('/users'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    rest_1.get('/me'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    rest_1.get('users/{user_id}/donations'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getDonationsByID", null);
UsersController = __decorate([
    __param(0, repository_1.repository(users_repository_1.UserRepository.name)),
    __param(1, repository_1.repository(donations_repository_1.DonationsRepository.name)),
    __param(2, repository_1.repository(payment_methods_repository_1.PaymentMethodsRepository.name)),
    __param(3, repository_1.repository(role_map_repository_1.RoleMapRepository.name)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        donations_repository_1.DonationsRepository,
        payment_methods_repository_1.PaymentMethodsRepository,
        role_map_repository_1.RoleMapRepository])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=user.controller.js.map
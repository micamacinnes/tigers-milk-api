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
const donations_1 = require("../models/donations");
const donations_repository_1 = require("../repositories/donations.repository");
let DonationsController = class DonationsController {
    constructor(donationsRepo) {
        this.donationsRepo = donationsRepo;
    }
    async getAllDonation() {
        return await this.donationsRepo.find();
    }
    async DonationsPerUser(userID) {
        return await this.donationsRepo.find({
            where: {
                user_id: userID
            }
        });
    }
    async newDonation(user_id, charity_id, donation_amount) {
        var donation = new donations_1.Donations;
        donation.amount_donated = donation_amount;
        donation.user_id = user_id;
        donation.charity_id = charity_id;
        return await this.donationsRepo.create(donation);
    }
};
__decorate([
    rest_1.get('/donation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getAllDonation", null);
__decorate([
    rest_1.get('/donation/{user_id}'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "DonationsPerUser", null);
__decorate([
    rest_1.post('/user/{user_id}/charity{charity_id}/donation'),
    __param(0, rest_1.param.path.number('user_id')),
    __param(1, rest_1.param.path.number('charity_id')),
    __param(2, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "newDonation", null);
DonationsController = __decorate([
    __param(0, repository_1.repository(donations_repository_1.DonationsRepository.name)),
    __metadata("design:paramtypes", [donations_repository_1.DonationsRepository])
], DonationsController);
exports.DonationsController = DonationsController;
//# sourceMappingURL=donations.controller.js.map
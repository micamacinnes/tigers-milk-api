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
const users_repository_1 = require("../repositories/users.repository");
const charities_repository_1 = require("../repositories/charities.repository");
let DonationsController = class DonationsController {
    constructor(donationsRepo, userRepo, charityRepo) {
        this.donationsRepo = donationsRepo;
        this.userRepo = userRepo;
        this.charityRepo = charityRepo;
    }
    async getAllDonations() {
        return await this.donationsRepo.find();
    }
    async DonationsPerUserString(user_id) {
        var id = new Array();
        var charities = new Array();
        var findDonations = [];
        var findDonations = await this.donationsRepo.find();
        for (var i = 1; i < findDonations.length + 1; i++) {
            var donation = await this.donationsRepo.findById(i);
            if (user_id == donation.user_id) {
                if (!id.includes(donation.charity_id)) {
                    id.push(donation.charity_id);
                    charities.push("Donated $" + donation.amount_donated + "to" + donation.charity_id);
                }
            }
        }
        return charities;
    }
    async DonationsPerCharity(charity_id) {
        var idArr = new Array();
        var donations = [];
        var findDonations = [];
        var findDonations = await this.donationsRepo.find();
        for (var i = 1; i < findDonations.length + 1; i++) {
            var donation = await this.donationsRepo.findById(i);
            if (charity_id == donation.charity_id) {
                if (!idArr.includes(donation.charity_id)) {
                    idArr.push(donation.charity_id);
                    donation.push(donation.charity_id);
                }
            }
        }
        return donations;
    }
    async newDonation(donation) {
        let userExists = !!(await this.userRepo.count({ donations_id: donation.user_id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('User does not exist');
        }
        let charityExists = !!(await this.charityRepo.count({ donations_id: donation.charity_id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.Unauthorized('Charity does not exist');
        }
        if (donation.amount_donated <= 0) {
            throw new rest_1.HttpErrors.Unauthorized('donation amount is 0');
        }
        return await this.donationsRepo.create(donation);
    }
    async donationTotalPerUser(user_id) {
        var totalDonations = 0;
        var findDonations = [];
        var findDonations = await this.donationsRepo.find();
        for (var i = 1; i < findDonations.length + 1; i++) {
            var donation = await this.donationsRepo.findById(i);
            if (user_id == donation.user_id) {
                totalDonations += donation.amount_donated;
            }
        }
        return totalDonations;
    }
};
__decorate([
    rest_1.get('/donation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getAllDonations", null);
__decorate([
    rest_1.get('/donation/{user_id}'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "DonationsPerUserString", null);
__decorate([
    rest_1.get('/donation/{charity_id}'),
    __param(0, rest_1.param.query.number('charity_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "DonationsPerCharity", null);
__decorate([
    rest_1.post('/donation'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donations_1.Donations]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "newDonation", null);
__decorate([
    rest_1.get('donations/{user_id}/totalDonations'),
    __param(0, rest_1.param.path.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "donationTotalPerUser", null);
DonationsController = __decorate([
    __param(0, repository_1.repository(donations_repository_1.DonationsRepository.name)),
    __param(1, repository_1.repository(users_repository_1.UserRepository.name)),
    __param(2, repository_1.repository(charities_repository_1.CharitiesRepository.name)),
    __metadata("design:paramtypes", [donations_repository_1.DonationsRepository,
        users_repository_1.UserRepository,
        charities_repository_1.CharitiesRepository])
], DonationsController);
exports.DonationsController = DonationsController;
//# sourceMappingURL=donations.controller.js.map
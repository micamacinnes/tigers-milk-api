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
const jsonwebtoken_1 = require("jsonwebtoken");
let DonationsController = class DonationsController {
    constructor(donationsRepo, userRepo, charityRepo) {
        this.donationsRepo = donationsRepo;
        this.userRepo = userRepo;
        this.charityRepo = charityRepo;
    }
    async getAllDonations() {
        return await this.donationsRepo.find();
    }
    async getDonationsByUserId(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtBody);
            //Find all the donations associated with the user id
            var userDonations = await this.donationsRepo.find({ where: { userID: jwtBody.user.id } });
            // // var charities = await this.donationsRepo.find({where: {charityID: jwtBody.charity.id}});
            // var charitiesInDonations = await this.donationsRepo.find({where:{
            //   userID:jwtBody.user.id,
            //   charityID: jwtBody.charity.id
            // }})
            //Convert the charityId for each donation into a charity name and logo
            // var allCharities = await this.charityRepo.find();
            // var charityIdToName: { [key: number]: string } = {};
            // var charityIdToImg: { [key: number]: string } = {};
            // for (var i = 0; i < charities.length; ++i) {
            //   // let charity = allCharities[i];
            //   // charityIdToName[charity.id as number] = charity.name;
            //   // charityIdToImg[charity.id as number] = charity.img;
            // }
            //Create object with userDonation properties and charity name and logo properties
            // var userDonationProperties: Array<object> = [];
            // for (var i = 0; i < userDonations.length; ++i) {
            //   let { amount, date, charityID} = userDonations[i];
            //   userDonationProperties.push({
            //     amount,
            //     date,
            //     // charityName: charityIdToName[charityID as number],
            //     // charityLogo: charityIdToImg[charityId as number],
            //   });
            // }
            return userDonations;
        }
        catch (err) {
            console.log(err);
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    //create a donation with userId and charityId
    async createDonation(newDonation, jwt, charityID) {
        if (!jwt) {
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        }
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtBody);
            newDonation.userID = jwtBody.user.id;
            newDonation.charityID = charityID;
            console.log(jwtBody);
            console.log(charityID);
            var donation = this.donationsRepo.create(newDonation);
            return donation;
        }
        catch (err) {
            console.log(err);
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
};
__decorate([
    rest_1.get('/donation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getAllDonations", null);
__decorate([
    rest_1.get('/donations'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "getDonationsByUserId", null);
__decorate([
    rest_1.post('/createDonation'),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.string('jwt')),
    __param(2, rest_1.param.query.number('charityID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donations_1.Donations, String, Number]),
    __metadata("design:returntype", Promise)
], DonationsController.prototype, "createDonation", null);
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
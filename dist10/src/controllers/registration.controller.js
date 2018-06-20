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
// Uncomment these imports to begin using these cool features!
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const user_1 = require("../models/user");
const users_repository_1 = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
let RegistrationController = class RegistrationController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async createNewUser(user) {
        // Check required fields
        if (!user.email || !user.password) {
            throw new rest_1.HttpErrors.BadRequest('missing data');
        }
        // Check that user does not already exist
        let userExists = !!(await this.userRepo.count({ email: user.email }));
        if (userExists) {
            throw new rest_1.HttpErrors.BadRequest('user already exists');
        }
        let hashedPassword = await bcrypt.hash(user.password, 10);
        var userToStore = new user_1.User();
        userToStore.firstname = user.firstname;
        userToStore.lastname = user.lastname;
        userToStore.email = user.email;
        userToStore.password = hashedPassword;
        let storedUser = await this.userRepo.create(userToStore);
        storedUser.password = "";
        return storedUser;
    }
};
__decorate([
    rest_1.post('/registration'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "createNewUser", null);
RegistrationController = __decorate([
    __param(0, repository_1.repository(users_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], RegistrationController);
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map
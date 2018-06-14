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
// import {inject} from '@loopback/context';
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const charities_repository_1 = require("../repositories/charities.repository");
let CharitiesController = class CharitiesController {
    constructor(charityRepo) {
        this.charityRepo = charityRepo;
    }
    async getCharity() {
        return await this.charityRepo.find();
    }
    async findCharityById(id) {
        // Check for valid ID
        let charityExists = !!(await this.charityRepo.count({ id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest(`charity ID ${id} does not exist`);
        }
        return await this.charityRepo.findById(id);
    }
};
__decorate([
    rest_1.get('/charities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "getCharity", null);
__decorate([
    rest_1.get('/charities/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharitiesController.prototype, "findCharityById", null);
CharitiesController = __decorate([
    __param(0, repository_1.repository(charities_repository_1.CharitiesRepository.name)),
    __metadata("design:paramtypes", [charities_repository_1.CharitiesRepository])
], CharitiesController);
exports.CharitiesController = CharitiesController;
//# sourceMappingURL=charities.controller.js.map
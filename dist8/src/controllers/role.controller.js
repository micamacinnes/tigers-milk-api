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
const repository_1 = require("@loopback/repository");
const role_repository_1 = require("../repositories/role.repository");
const rest_1 = require("@loopback/rest");
let RoleController = class RoleController {
    constructor(roleRepo) {
        this.roleRepo = roleRepo;
    }
    async findRoles() {
        return await this.roleRepo.find();
    }
    async findRolesById(id) {
        // Check for valid ID
        let roleExists = !!(await this.roleRepo.count({ id }));
        if (!roleExists) {
            throw new rest_1.HttpErrors.BadRequest(`role ID ${id} does not exist`);
        }
        return await this.roleRepo.findById(id);
    }
};
__decorate([
    rest_1.get('/roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findRoles", null);
__decorate([
    rest_1.get('/roles/{role_id}'),
    __param(0, rest_1.param.path.number('role_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findRolesById", null);
RoleController = __decorate([
    __param(0, repository_1.repository(role_repository_1.RoleRepository)),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map
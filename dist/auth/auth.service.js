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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const admin_entity_1 = require("../_common/entities/admin.entity");
let AuthService = class AuthService {
    adminRepo;
    jwtService;
    constructor(adminRepo, jwtService) {
        this.adminRepo = adminRepo;
        this.jwtService = jwtService;
    }
    async validateAdmin(username, pass) {
        const admin = await this.adminRepo.findOneBy({ username });
        if (!admin || !admin.isActive)
            return null;
        const isMatch = await bcrypt.compare(pass, admin.password);
        return isMatch ? admin : null;
    }
    async login(dto) {
        const admin = await this.validateAdmin(dto.username, dto.password);
        if (!admin)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const payload = { username: admin.username, sub: admin.id, role: admin.role };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
            admin: { id: admin.id, username: admin.username, role: admin.role },
        };
    }
    async register(dto) {
        const exists = await this.adminRepo.findOne({
            where: [
                { username: dto.username },
                { email: dto.email }
            ]
        });
        if (exists)
            throw new common_1.BadRequestException('Admin already exists');
        const hash = await bcrypt.hash(dto.password, 10);
        const admin = this.adminRepo.create({ ...dto, password: hash });
        return this.adminRepo.save(admin);
    }
    async profile(adminId) {
        const admin = await this.adminRepo.findOneBy({ id: adminId });
        if (!admin)
            throw new common_1.UnauthorizedException('Admin not found');
        return { id: admin.id, username: admin.username, email: admin.email, role: admin.role, lastLogin: admin.lastLogin };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
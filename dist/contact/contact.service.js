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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("../_common/entities/contact.entity");
const email_service_1 = require("../_common/services/email.service");
let ContactService = class ContactService {
    contactRepo;
    emailService;
    constructor(contactRepo, emailService) {
        this.contactRepo = contactRepo;
        this.emailService = emailService;
    }
    async create(dto) {
        try {
            const contact = this.contactRepo.create(dto);
            const savedContact = await this.contactRepo.save(contact);
            await Promise.allSettled([
                this.emailService.sendContactNotificationToAdmin(dto),
                this.emailService.sendContactConfirmationToUser(dto),
            ]);
            return {
                success: true,
                message: 'Mesajınız uğurla göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.',
                data: savedContact,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Mesaj göndərilən zaman xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
                error: error.message,
            };
        }
    }
    async findAll() {
        return this.contactRepo.find({
            order: { createdAt: 'DESC' },
            select: ['id', 'name', 'email', 'message', 'isRead', 'createdAt']
        });
    }
    async findOne(id) {
        const contact = await this.contactRepo.findOneBy({ id });
        if (!contact) {
            throw new common_1.NotFoundException('Contact message not found');
        }
        if (!contact.isRead) {
            contact.isRead = true;
            await this.contactRepo.save(contact);
        }
        return contact;
    }
    async remove(id) {
        const contact = await this.contactRepo.findOneBy({ id });
        if (!contact) {
            throw new common_1.NotFoundException('Contact message not found');
        }
        await this.contactRepo.remove(contact);
        return {
            success: true,
            message: 'Mesaj uğurla silindi'
        };
    }
    async getUnreadCount() {
        return this.contactRepo.count({ where: { isRead: false } });
    }
    async markAllAsRead() {
        await this.contactRepo.update({ isRead: false }, { isRead: true });
        return { success: true, message: 'Bütün mesajlar oxunmuş kimi işarələndi' };
    }
    async markSelectedAsRead(ids) {
        if (!Array.isArray(ids) || ids.length === 0) {
            return { success: false, message: 'Heç bir id göndərilməyib' };
        }
        await this.contactRepo.update(ids, { isRead: true });
        return { success: true, message: 'Seçilmiş mesajlar oxunmuş kimi işarələndi' };
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], ContactService);
//# sourceMappingURL=contact.service.js.map
import { Repository } from 'typeorm';
import { Contact } from '../_common/entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { EmailService } from '../_common/services/email.service';
export declare class ContactService {
    private readonly contactRepo;
    private readonly emailService;
    constructor(contactRepo: Repository<Contact>, emailService: EmailService);
    create(dto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        data: Contact;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    findAll(): Promise<Contact[]>;
    findOne(id: number): Promise<Contact>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getUnreadCount(): Promise<number>;
    markAllAsRead(): Promise<{
        success: boolean;
        message: string;
    }>;
    markSelectedAsRead(ids: number[]): Promise<{
        success: boolean;
        message: string;
    }>;
}

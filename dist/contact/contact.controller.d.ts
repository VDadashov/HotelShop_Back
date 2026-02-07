import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(createContactDto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
        data: import("../_common/entities/contact.entity").Contact;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
    findAll(): Promise<import("../_common/entities/contact.entity").Contact[]>;
    getUnreadCount(): Promise<number>;
    markAsRead(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    findOne(id: string): Promise<import("../_common/entities/contact.entity").Contact>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

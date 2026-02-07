import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from '../../contact/dto/create-contact.dto';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendContactNotificationToAdmin(contactData: CreateContactDto): Promise<void>;
    sendContactConfirmationToUser(contactData: CreateContactDto): Promise<void>;
    private getAdminNotificationTemplate;
    private getUserConfirmationTemplate;
}

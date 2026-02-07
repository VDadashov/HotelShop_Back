import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { FaqQueryDto } from './dto/faq-query.dto';
import { Faq } from '../_common/entities/faq.entity';
export declare class FaqController {
    private readonly faqService;
    constructor(faqService: FaqService);
    findAll(queryDto: FaqQueryDto, allLanguages?: boolean, acceptLanguage?: string, isActive?: boolean): Promise<{
        success: boolean;
        data: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
        message: string;
    }>;
    getAll(allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    findOne(id: number, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    create(createFaqDto: CreateFaqDto): Promise<{
        success: boolean;
        data: Faq;
        message: string;
    }>;
    update(id: number, updateFaqDto: UpdateFaqDto): Promise<{
        success: boolean;
        data: Faq;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}

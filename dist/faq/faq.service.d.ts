import { Repository } from 'typeorm';
import { Faq } from '../_common/entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { FaqQueryDto } from './dto/faq-query.dto';
import { I18nService } from '../i18n/i18n.service';
export declare class FaqService {
    private readonly faqRepository;
    private readonly i18n;
    constructor(faqRepository: Repository<Faq>, i18n: I18nService);
    create(createFaqDto: CreateFaqDto): Promise<Faq>;
    getAll(lang?: string): Promise<any[]>;
    getAllForAdmin(): Promise<Faq[]>;
    findAll(queryDto?: FaqQueryDto, lang?: string, isActive?: boolean): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllForAdmin(queryDto?: FaqQueryDto): Promise<{
        data: Faq[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number, lang?: string): Promise<any>;
    findOneForAdmin(id: number): Promise<Faq>;
    update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq>;
    remove(id: number): Promise<void>;
}

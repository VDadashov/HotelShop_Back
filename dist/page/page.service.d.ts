import { Repository } from 'typeorm';
import { Page } from '../_common/entities/page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { I18nService } from '../i18n/i18n.service';
export declare class PageService {
    private readonly pageRepo;
    private readonly i18n;
    constructor(pageRepo: Repository<Page>, i18n: I18nService);
    create(createPageDto: CreatePageDto): Promise<Page>;
    findAll(lang?: string): Promise<{
        id: number;
        title: string;
        slug: string;
        isActive: boolean;
    }[]>;
    findOne(id: number, lang?: string): Promise<{
        id: number;
        title: string;
        slug: string;
        isActive: boolean;
    }>;
    update(id: number, updatePageDto: UpdatePageDto): Promise<Page>;
    remove(id: number): Promise<{
        deleted: boolean;
        message: string;
    }>;
    findAllForAdmin(): Promise<{
        id: number;
        title: import("../_common/entities/page.entity").MultiLanguageText;
        slug: string;
        isActive: boolean;
        titleAz: string;
        titleEn: string;
        titleRu: string;
    }[]>;
    findOneForAdmin(id: number): Promise<{
        id: number;
        title: import("../_common/entities/page.entity").MultiLanguageText;
        slug: string;
        isActive: boolean;
        titleAz: string;
        titleEn: string;
        titleRu: string;
    }>;
    checkTitleExists(title: string, lang: string, excludeId?: number): Promise<boolean>;
    private getTranslatedField;
    updateTitle(id: number, titleData: {
        az?: string;
        en?: string;
        ru?: string;
    }): Promise<Page>;
    private slugify;
}

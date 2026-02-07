import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
export declare class PageController {
    private readonly pageService;
    constructor(pageService: PageService);
    findAll(allLanguages?: boolean, acceptLanguage?: string): Promise<{
        id: number;
        title: import("../_common/entities/page.entity").MultiLanguageText;
        slug: string;
        isActive: boolean;
        titleAz: string;
        titleEn: string;
        titleRu: string;
    }[] | {
        id: number;
        title: string;
        slug: string;
        isActive: boolean;
    }[]>;
    findOne(id: number, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        id: number;
        title: import("../_common/entities/page.entity").MultiLanguageText;
        slug: string;
        isActive: boolean;
        titleAz: string;
        titleEn: string;
        titleRu: string;
    } | {
        id: number;
        title: string;
        slug: string;
        isActive: boolean;
    }>;
    create(dto: CreatePageDto): Promise<import("../_common/entities/page.entity").Page>;
    update(id: number, updatePageDto: UpdatePageDto): Promise<{
        success: boolean;
        message: string;
        data: import("../_common/entities/page.entity").Page;
    }>;
    remove(id: number): Promise<{
        deleted: boolean;
        message: string;
    }>;
}

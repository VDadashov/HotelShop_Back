import { Repository } from 'typeorm';
import { Section } from '../_common/entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Page } from 'src/_common/entities/page.entity';
export declare class SectionService {
    private readonly sectionRepository;
    private readonly pageRepository;
    constructor(sectionRepository: Repository<Section>, pageRepository: Repository<Page>);
    create(createSectionDto: CreateSectionDto): Promise<Section>;
    findAllWithSelectedLanguage(pageId?: number, type?: string, acceptLanguage?: string): Promise<any[]>;
    private filterAdditionalDataForLanguage;
    findAllForAdmin(): Promise<Section[]>;
    findOne(id: number): Promise<Section>;
    update(id: number, updateSectionDto: UpdateSectionDto): Promise<Section>;
    remove(id: number): Promise<void>;
}

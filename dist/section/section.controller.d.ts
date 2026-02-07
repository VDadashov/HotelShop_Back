import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from '../_common/entities/section.entity';
export declare class SectionController {
    private readonly sectionService;
    constructor(sectionService: SectionService);
    create(createSectionDto: CreateSectionDto): Promise<Section>;
    findAll(pageId?: string, type?: string, allLanguages?: boolean, acceptLanguage?: string): Promise<Section[]>;
    findOne(id: number): Promise<Section>;
    update(id: number, updateSectionDto: UpdateSectionDto): Promise<Section>;
    remove(id: number): Promise<void>;
}

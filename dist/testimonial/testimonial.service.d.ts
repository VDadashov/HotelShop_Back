import { Repository } from 'typeorm';
import { Testimonial } from '../_common/entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { TestimonialQueryDto } from './dto/testimonial-query.dto';
import { I18nService } from '../i18n/i18n.service';
export declare class TestimonialService {
    private readonly testimonialRepository;
    private readonly i18n;
    constructor(testimonialRepository: Repository<Testimonial>, i18n: I18nService);
    create(createTestimonialDto: CreateTestimonialDto): Promise<Testimonial>;
    getAll(lang?: string): Promise<any[]>;
    getAllForAdmin(): Promise<Testimonial[]>;
    findAll(queryDto?: TestimonialQueryDto, lang?: string): Promise<{
        data: any[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
    }>;
    findAllForAdmin(queryDto?: TestimonialQueryDto): Promise<{
        data: Testimonial[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
    }>;
    findOne(id: number, lang?: string): Promise<any>;
    findOneForAdmin(id: number): Promise<Testimonial>;
    update(id: number, updateTestimonialDto: UpdateTestimonialDto): Promise<Testimonial>;
    remove(id: number): Promise<void>;
    getActiveTestimonials(lang?: string): Promise<any[]>;
    getActiveTestimonialsForAdmin(): Promise<Testimonial[]>;
}

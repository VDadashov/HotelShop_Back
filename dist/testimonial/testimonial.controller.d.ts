import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { TestimonialQueryDto } from './dto/testimonial-query.dto';
import { Testimonial } from '../_common/entities/testimonial.entity';
import { UploadService } from '../upload/upload.service';
export declare class TestimonialController {
    private readonly testimonialService;
    private readonly uploadService;
    constructor(testimonialService: TestimonialService, uploadService: UploadService);
    create(createTestimonialDto: CreateTestimonialDto, file?: Express.Multer.File): Promise<{
        success: boolean;
        data: Testimonial;
        message: string;
    }>;
    findAll(queryDto: TestimonialQueryDto, isActive?: boolean, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        pagination: {
            totalItems: number;
            totalPages: number;
            currentPage: number;
            pageSize: number;
        };
        message: string;
    }>;
    getAll(allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    getActiveTestimonials(allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any[];
        message: string;
    }>;
    findOne(id: number, allLanguages?: boolean, acceptLanguage?: string): Promise<{
        success: boolean;
        data: any;
        message: string;
    }>;
    update(id: number, updateTestimonialDto: UpdateTestimonialDto): Promise<{
        success: boolean;
        data: Testimonial;
        message: string;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}

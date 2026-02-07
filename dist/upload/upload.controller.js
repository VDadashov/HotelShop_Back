"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const upload_service_1 = require("./upload.service");
const upload_image_dto_1 = require("./dto/upload-image.dto");
const upload_pdf_dto_1 = require("./dto/upload-pdf.dto");
const upload_video_dto_1 = require("./dto/upload-video.dto");
const delete_file_dto_1 = require("./dto/delete-file.dto");
const upload_query_dto_1 = require("./dto/upload-query.dto");
const file_validation_util_1 = require("../_common/utils/file-validation.util");
const multer_exception_filter_1 = require("../_common/filters/multer-exception.filter");
const jwt_auth_guard_1 = require("../_common/guards/jwt-auth.guard");
const roles_guard_1 = require("../_common/guards/roles.guard");
const roles_decorator_1 = require("../_common/decorators/roles.decorator");
const common_2 = require("@nestjs/common");
let UploadController = class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async getAllFiles(queryDto) {
        const result = await this.uploadService.getAllFiles(queryDto);
        return {
            success: true,
            data: result.data,
            pagination: result.pagination,
            message: 'Fayllar uğurla əldə edildi',
        };
    }
    async uploadImage(file) {
        return await this.uploadService.saveFile(file, 'images');
    }
    async uploadPdf(file) {
        return await this.uploadService.saveFile(file, 'pdfs');
    }
    async uploadVideo(file) {
        return await this.uploadService.saveFile(file, 'videos');
    }
    async deleteFile(deleteFileDto) {
        const result = await this.uploadService.deleteFile(deleteFileDto.publicId, deleteFileDto.resourceType || 'image');
        return {
            success: true,
            message: 'Fayl uğurla silindi',
            result,
        };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Bütün yüklənmiş faylları gətir (pagination və filter ilə)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Faylların siyahısı',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            publicId: { type: 'string', example: 'hotelshop/images/1764608698070-364854808' },
                            url: { type: 'string', example: 'https://res.cloudinary.com/...' },
                            format: { type: 'string', example: 'png' },
                            width: { type: 'number', example: 1920 },
                            height: { type: 'number', example: 1080 },
                            bytes: { type: 'number', example: 1668186 },
                            createdAt: { type: 'string', example: '2024-01-01T00:00:00Z' },
                            folder: { type: 'string', example: 'hotelshop/images' },
                            resourceType: { type: 'string', example: 'image' },
                            filename: { type: 'string', example: '1764608698070-364854808.png' },
                        },
                    },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        totalItems: { type: 'number', example: 100 },
                        totalPages: { type: 'number', example: 10 },
                        currentPage: { type: 'number', example: 1 },
                        pageSize: { type: 'number', example: 10 },
                    },
                },
                message: { type: 'string', example: 'Fayllar uğurla əldə edildi' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Qeyri-təsdiq edilmiş istifadəçi',
    }),
    __param(0, (0, common_1.Query)(new common_2.ValidationPipe({
        transform: true,
        whitelist: false,
        skipMissingProperties: true,
        forbidUnknownValues: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_query_dto_1.UploadQueryDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getAllFiles", null);
__decorate([
    (0, common_1.Post)('image'),
    (0, swagger_1.ApiOperation)({ summary: 'Şəkil yüklə' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: upload_image_dto_1.UploadImageDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Şəkil uğurla yükləndi' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: file_validation_util_1.imageFileFilter,
        limits: { fileSize: file_validation_util_1.imageMaxSize },
    })),
    (0, common_1.UseFilters)(multer_exception_filter_1.MulterExceptionFilter),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('pdf'),
    (0, swagger_1.ApiOperation)({ summary: 'PDF yüklə' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: upload_pdf_dto_1.UploadPdfDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'PDF uğurla yükləndi' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: file_validation_util_1.pdfFileFilter,
        limits: { fileSize: file_validation_util_1.pdfMaxSize },
    })),
    (0, common_1.UseFilters)(multer_exception_filter_1.MulterExceptionFilter),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadPdf", null);
__decorate([
    (0, common_1.Post)('video'),
    (0, swagger_1.ApiOperation)({ summary: 'Video yüklə' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: upload_video_dto_1.UploadVideoDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Video uğurla yükləndi' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.memoryStorage)(),
        fileFilter: file_validation_util_1.videoFileFilter,
        limits: { fileSize: file_validation_util_1.videoMaxSize },
    })),
    (0, common_1.UseFilters)(multer_exception_filter_1.MulterExceptionFilter),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Faylı Cloudinary-dən sil' }),
    (0, swagger_1.ApiBody)({ type: delete_file_dto_1.DeleteFileDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Fayl uğurla silindi',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Fayl uğurla silindi' },
                result: {
                    type: 'object',
                    properties: {
                        result: { type: 'string', example: 'ok' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Yanlış publicId və ya fayl tapılmadı',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Qeyri-təsdiq edilmiş istifadəçi',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_file_dto_1.DeleteFileDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "deleteFile", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('Upload'),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map
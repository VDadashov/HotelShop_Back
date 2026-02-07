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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_config_1 = require("../config/cloudinary.config");
let UploadService = class UploadService {
    configService;
    cloudinaryInstance;
    constructor(configService) {
        this.configService = configService;
        this.cloudinaryInstance = (0, cloudinary_config_1.configureCloudinary)(this.configService);
    }
    async saveFile(file, folder) {
        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: `hotelshop/${folder}`,
                resource_type: folder === 'videos' ? 'video' : 'auto',
                public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
            };
            const uploadStream = this.cloudinaryInstance.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    reject(error);
                }
                else if (!result) {
                    reject(new Error('Upload failed: No result returned'));
                }
                else {
                    resolve({
                        media: {
                            alt: {
                                az: file.originalname,
                                en: file.originalname,
                                ru: file.originalname,
                            },
                            url: result.secure_url,
                            publicId: result.public_id,
                            size: file.size,
                            type: folder === 'videos'
                                ? 'video'
                                : folder === 'images'
                                    ? 'image'
                                    : 'file',
                            mimeType: file.mimetype,
                        },
                    });
                }
            });
            uploadStream.end(file.buffer);
        });
    }
    async deleteFile(publicId, resourceType = 'image') {
        try {
            const result = await this.cloudinaryInstance.uploader.destroy(publicId, {
                resource_type: resourceType,
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllFiles(query) {
        try {
            const page = query.page || 1;
            const pageSize = query.pageSize || 10;
            const resourceType = query.resourceType || 'image';
            let folder = query.folder;
            if (!folder) {
                switch (resourceType) {
                    case 'image':
                        folder = 'images';
                        break;
                    case 'video':
                        folder = 'videos';
                        break;
                    case 'raw':
                        folder = 'pdfs';
                        break;
                }
            }
            const options = {
                type: 'upload',
                resource_type: resourceType,
                max_results: 500,
                prefix: `hotelshop/${folder}`,
            };
            const result = await this.cloudinaryInstance.api.resources(options);
            const files = result.resources.map((resource) => ({
                publicId: resource.public_id,
                url: resource.secure_url,
                format: resource.format,
                width: resource.width,
                height: resource.height,
                bytes: resource.bytes,
                createdAt: resource.created_at,
                folder: resource.folder,
                resourceType: resource.resource_type,
                filename: resource.public_id.split('/').pop() || resource.public_id,
            }));
            const totalItems = files.length;
            const totalPages = Math.ceil(totalItems / pageSize);
            const offset = (page - 1) * pageSize;
            const paginatedFiles = files.slice(offset, offset + pageSize);
            return {
                data: paginatedFiles,
                pagination: {
                    totalItems,
                    totalPages,
                    currentPage: page,
                    pageSize,
                },
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadService);
//# sourceMappingURL=upload.service.js.map
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
export declare const configureCloudinary: (configService: ConfigService) => typeof cloudinary;

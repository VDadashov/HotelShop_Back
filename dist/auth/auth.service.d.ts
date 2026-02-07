import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../_common/entities/admin.entity';
import { LoginDto } from './dto/login.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';
export declare class AuthService {
    private readonly adminRepo;
    private readonly jwtService;
    constructor(adminRepo: Repository<Admin>, jwtService: JwtService);
    validateAdmin(username: string, pass: string): Promise<Admin | null>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: number;
            username: string;
            role: string;
        };
    }>;
    register(dto: AdminRegisterDto): Promise<Admin>;
    profile(adminId: number): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        lastLogin: Date;
    }>;
}

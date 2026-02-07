import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        admin: {
            id: number;
            username: string;
            role: string;
        };
    }>;
    register(dto: AdminRegisterDto): Promise<import("../_common/entities/admin.entity").Admin>;
    profile(req: any): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        lastLogin: Date;
    }>;
    adminProtected(): {
        message: string;
    };
    createTestAdmin(): Promise<import("../_common/entities/admin.entity").Admin>;
}

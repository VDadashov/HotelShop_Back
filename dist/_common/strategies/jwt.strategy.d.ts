import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly adminRepo;
    constructor(adminRepo: Repository<Admin>);
    validate(payload: any): Promise<{
        id: number;
        username: string;
        role: string;
    }>;
}
export {};

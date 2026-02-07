"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
exports.typeOrmConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (config) => {
        const isDevelopment = config.get('NODE_ENV') !== 'production';
        const databaseUrl = config.get('DATABASE_URL');
        if (databaseUrl) {
            return {
                type: 'postgres',
                url: databaseUrl,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                autoLoadEntities: true,
                synchronize: true,
                ssl: !isDevelopment ? { rejectUnauthorized: false } : false,
                retryAttempts: 10,
                retryDelay: 3000,
            };
        }
        else {
            return {
                type: 'postgres',
                host: config.get('DB_HOST', 'localhost'),
                port: parseInt(config.get('DB_PORT', '5432'), 10),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_NAME'),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                autoLoadEntities: true,
                synchronize: true,
            };
        }
    },
};
//# sourceMappingURL=typeorm.config.js.map
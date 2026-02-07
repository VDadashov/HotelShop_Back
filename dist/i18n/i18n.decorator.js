"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lang = void 0;
const common_1 = require("@nestjs/common");
exports.Lang = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.lang || 'az';
});
//# sourceMappingURL=i18n.decorator.js.map
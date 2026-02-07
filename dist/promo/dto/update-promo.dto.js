"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePromoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_promo_dto_1 = require("./create-promo.dto");
class UpdatePromoDto extends (0, swagger_1.PartialType)(create_promo_dto_1.CreatePromoDto) {
}
exports.UpdatePromoDto = UpdatePromoDto;
//# sourceMappingURL=update-promo.dto.js.map
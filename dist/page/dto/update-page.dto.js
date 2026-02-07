"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_page_dto_1 = require("./create-page.dto");
class UpdatePageDto extends (0, swagger_1.PartialType)(create_page_dto_1.CreatePageDto) {
}
exports.UpdatePageDto = UpdatePageDto;
//# sourceMappingURL=update-page.dto.js.map
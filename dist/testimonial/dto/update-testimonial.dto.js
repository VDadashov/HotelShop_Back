"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTestimonialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_testimonial_dto_1 = require("./create-testimonial.dto");
class UpdateTestimonialDto extends (0, swagger_1.PartialType)(create_testimonial_dto_1.CreateTestimonialDto) {
}
exports.UpdateTestimonialDto = UpdateTestimonialDto;
//# sourceMappingURL=update-testimonial.dto.js.map
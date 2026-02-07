"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformJsonToClass = TransformJsonToClass;
const class_transformer_1 = require("class-transformer");
function TransformJsonToClass(cls) {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return undefined;
        if (typeof value === 'string') {
            try {
                return new cls(JSON.parse(value));
            }
            catch {
                throw new Error(`Invalid JSON format for ${cls.name}`);
            }
        }
        if (typeof value === 'object')
            return new cls(value);
        return value;
    });
}
//# sourceMappingURL=transform-json-to-class.js.map
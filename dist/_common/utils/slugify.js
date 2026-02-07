"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
function slugify(text) {
    return text
        .toString()
        .normalize('NFKD')
        .replace(/[\u0300-\u036F]/g, '')
        .replace(/[^\w\s-əöüğçşƏÖÜĞÇŞa-zA-Z0-9]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
}
//# sourceMappingURL=slugify.js.map
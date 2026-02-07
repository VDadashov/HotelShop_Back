"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNameEdit = fileNameEdit;
const path_1 = require("path");
function fileNameEdit(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
}
//# sourceMappingURL=file-name-edit.util.js.map
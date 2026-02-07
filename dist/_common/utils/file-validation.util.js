"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoMaxSize = exports.pdfMaxSize = exports.imageMaxSize = void 0;
exports.imageFileFilter = imageFileFilter;
exports.pdfFileFilter = pdfFileFilter;
exports.videoFileFilter = videoFileFilter;
function imageFileFilter(req, file, cb) {
    if (!file.mimetype.match(/^image\/(jpeg|png|jpg|webp)$/)) {
        return cb(new Error('Yalnız şəkil faylları qəbul olunur!'), false);
    }
    cb(null, true);
}
function pdfFileFilter(req, file, cb) {
    if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Yalnız PDF faylları qəbul olunur!'), false);
    }
    cb(null, true);
}
function videoFileFilter(req, file, cb) {
    if (!file.mimetype.match(/^video\/(mp4|webm|avi|mkv)$/)) {
        return cb(new Error('Yalnız video faylları qəbul olunur!'), false);
    }
    cb(null, true);
}
exports.imageMaxSize = 5 * 1024 * 1024;
exports.pdfMaxSize = 10 * 1024 * 1024;
exports.videoMaxSize = 50 * 1024 * 1024;
//# sourceMappingURL=file-validation.util.js.map
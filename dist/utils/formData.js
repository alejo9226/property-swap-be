"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formData = void 0;
const busboy_1 = __importDefault(require("busboy"));
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
function formData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let uploadingFile = false;
        let uploadingCount = 0;
        function done() {
            if (uploadingFile)
                return;
            if (uploadingCount > 0)
                return;
            next();
        }
        const busboy = new busboy_1.default({ headers: req.headers });
        //console.log('busboy', busboy)
        req.body = {};
        busboy.on('field', (key, val) => {
            //console.log('key, val', key, val)
            req.body[key] = val;
        });
        busboy.on('file', (key, file) => {
            console.log('key, file', key, file);
            uploadingFile = true;
            uploadingCount++;
            const stream = cloudinary_1.default.v2.uploader.upload_stream(undefined, (err, res) => {
                if (err)
                    throw new Error('Something went wrong!');
                req.body[key] = res;
                uploadingFile = false;
                uploadingCount--;
                done();
            });
            file.on('data', data => {
                //console.log('data', data)
                stream.write(data);
            });
            file.on('end', () => {
                //console.log('finish')
                stream.end();
            });
        });
        busboy.on('finish', () => {
            done();
        });
        req.pipe(busboy);
    });
}
exports.formData = formData;
//# sourceMappingURL=formData.js.map
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
exports.propertyImagesPost = exports.userImagesUpdate = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const property_model_1 = __importDefault(require("../models/property.model"));
function userImagesUpdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user, body } = req;
            const { file_attachment: { secure_url } } = body;
            console.log('entre a images post');
            console.log('req.body', req.body);
            const updatedUser = yield user_model_1.default.findOneAndUpdate({ _id: user }, { profilePic: secure_url }, { new: true });
            console.log('updatedUser', updatedUser);
            res.status(201).json({ message: 'Images uploaded successfully' });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    });
}
exports.userImagesUpdate = userImagesUpdate;
function propertyImagesPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user, body } = req;
            const { file_attachment: { secure_url } } = body;
            const property = yield property_model_1.default.create({});
        }
        catch (err) {
        }
    });
}
exports.propertyImagesPost = propertyImagesPost;
//# sourceMappingURL=upload.controller.js.map
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
exports.addProperty = void 0;
const property_model_1 = __importDefault(require("../models/property.model"));
function addProperty(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body, user } = req;
            const property = yield property_model_1.default.create(Object.assign(Object.assign({}, body), { user }));
            res.status(200).json({ message: 'property created', data: property });
        }
        catch (err) {
            res.status(400).json({ message: 'property not created', data: err.message });
        }
    });
}
exports.addProperty = addProperty;
//# sourceMappingURL=property.controller.js.map
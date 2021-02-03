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
exports.getUserInfo = exports.logIn = exports.signUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(user) {
    const expiresIn = 60 * 60 * 24; // an hour
    const secret = `${process.env.SECRET}`;
    const dataStoredInToken = {
        _id: user._id,
    };
    return {
        expiresIn,
        token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }),
    };
}
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body } = req;
            const { password } = body;
            const encPassword = yield bcrypt_1.default.hash(password, 8, undefined);
            const user = yield user_model_1.default.create(Object.assign(Object.assign({}, body), { password: encPassword }));
            const token = createToken(user);
            res.status(201).json({ token: token.token, message: 'Cuenta creada exitosamente' });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    });
}
exports.signUp = signUp;
function logIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body } = req;
            const { email } = body;
            const user = yield user_model_1.default.findOne({ email });
            const token = createToken(user);
            res.status(200).json({ token: token.token, message: 'Successfully logged in' });
        }
        catch (err) {
            res.status(200).json({ message: 'could not log in' });
        }
    });
}
exports.logIn = logIn;
function getUserInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user } = req;
            console.log('useer', user);
            const userInfo = yield user_model_1.default.findOne({ _id: user });
            res.status(200).json({ message: 'User found', data: userInfo });
        }
        catch (err) {
            res.status(400).json({ message: 'User not found', data: err.message });
        }
    });
}
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=user.controller.js.map
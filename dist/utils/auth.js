"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    try {
        const { authorization } = req.headers;
        console.log('req.headers', req.headers);
        if (!authorization)
            throw new Error('Su sesión expiró');
        const [_, token] = authorization.split(' ');
        if (!token)
            throw new Error('Su sesión expiró');
        const user = jsonwebtoken_1.default.verify(token, `${process.env.SECRET}`);
        if (typeof user === 'object') {
            console.log('user', user);
            req.user = user._id;
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
}
exports.default = auth;
//# sourceMappingURL=auth.js.map
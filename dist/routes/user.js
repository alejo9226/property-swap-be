"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = __importDefault(require("../utils/auth"));
const router = express_1.Router();
router.route('/signup').post(user_controller_1.signUp);
router.route('/login').post(user_controller_1.logIn);
router.route('/single').get(auth_1.default, user_controller_1.getUserInfo);
exports.default = router;
//# sourceMappingURL=user.js.map
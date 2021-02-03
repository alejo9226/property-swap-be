"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../utils/auth"));
const property_controller_1 = require("../controllers/property.controller");
const router = express_1.Router();
router.use(auth_1.default);
router.route('/add').post(property_controller_1.addProperty);
exports.default = router;
//# sourceMappingURL=property.js.map
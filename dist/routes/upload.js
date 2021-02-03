"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload.controller");
const auth_1 = __importDefault(require("../utils/auth"));
const formData_1 = require("../utils/formData");
const router = express_1.Router();
router.use(auth_1.default);
router.route('/user').put(formData_1.formData, upload_controller_1.userImagesUpdate);
router.route('/property').post(formData_1.formData, upload_controller_1.propertyImagesPost);
exports.default = router;
//# sourceMappingURL=upload.js.map
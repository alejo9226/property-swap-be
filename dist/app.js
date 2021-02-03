"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_1 = __importDefault(require("./routes/user"));
const property_1 = __importDefault(require("./routes/property"));
const upload_1 = __importDefault(require("./routes/upload"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use('/user', user_1.default);
app.use('/property', property_1.default);
app.use('/upload', upload_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
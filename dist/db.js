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
exports.connect = exports.connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.connection)
            return;
        const mongoURI = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/property-swap';
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };
        exports.connection = mongoose_1.default.connection;
        exports.connection.once('open', () => console.log('Connection established successfully'));
        exports.connection.on('disconnected', () => console.log('Successfully disconnected'));
        exports.connection.on('error', err => console.log('Something went wrong!', err));
        yield mongoose_1.default.connect(mongoURI, options);
    });
}
exports.connect = connect;
function disconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.connection)
            return;
        yield mongoose_1.default.disconnect();
    });
}
function cleanup() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const collection in exports.connection.collections) {
            yield exports.connection.collections[collection].deleteMany({});
        }
    });
}
module.exports = { connect, disconnect, cleanup };
//# sourceMappingURL=db.js.map
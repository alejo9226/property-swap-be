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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const userSchema = new mongoose_1.Schema({
    profilePic: {
        type: String
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(email) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = yield mongoose_1.models.User.findOne({ email });
                        return !user;
                    }
                    catch (err) {
                        return false;
                    }
                });
            },
            message: "Email already registered",
        }
    },
    password: {
        type: String,
        required: true,
    },
    property: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Property'
    }
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.model.js.map
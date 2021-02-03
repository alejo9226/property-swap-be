"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const propertySchema = new mongoose_1.Schema({
    address: {
        type: String,
        required: true,
    },
    coordinates: {
        type: String,
        required: true,
    },
    pictures: {
        type: [{
                type: String,
                required: true,
            }]
    },
    rooms: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stays: Number,
}, {
    timestamps: true,
});
exports.default = mongoose_1.model('Property', propertySchema);
//# sourceMappingURL=property.model.js.map
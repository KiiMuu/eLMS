"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64,
    },
    picture: {
        type: String,
        default: '/avatar.png',
    },
    role: {
        type: [String],
        default: ['subscriber'],
        enum: ['subscriber', 'instructor', 'admin'],
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {},
}, {
    timestamps: true,
});
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;

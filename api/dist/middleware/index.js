"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSignin = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
exports.requireSignin = (0, express_jwt_1.default)({
    getToken: (req) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
});

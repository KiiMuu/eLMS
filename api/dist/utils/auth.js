"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.genSalt(12, (error, salt) => {
            if (error)
                reject(error);
            bcrypt_1.default.hash(password, salt, (error, hash) => {
                if (error)
                    reject(error);
                resolve(hash);
            });
        });
    });
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;

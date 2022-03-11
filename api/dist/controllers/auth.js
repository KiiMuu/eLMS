"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let isUserExist = await User_1.default.findOne({ email }).exec();
        if (isUserExist) {
            return res.status(400).json({
                msg: 'That user with this email already exists.',
            });
        }
        let hashedPassword = await (0, auth_1.hashPassword)(password);
        let user = await new User_1.default({
            name,
            email,
            password: hashedPassword,
        }).save();
        return res.json(user);
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.signup = signup;

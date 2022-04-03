"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.getCurrentUser = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let isUserExist = await User_1.default.findOne({ email }).exec();
        if (isUserExist) {
            return res.status(400).json([
                {
                    msg: 'That user with this email already exists.',
                },
            ]);
        }
        let hashedPassword = await (0, auth_1.hashPassword)(password);
        let user = await new User_1.default({
            name,
            email,
            password: hashedPassword,
        }).save();
        user.password = undefined;
        return res.json(user);
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User_1.default.findOne({ email }).exec();
        if (!user) {
            return res.status(400).json([
                {
                    msg: 'That user with this email does not exists.',
                },
            ]);
        }
        const isMatch = await (0, auth_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(400).json([
                {
                    param: 'password',
                    msg: 'Incorrect password, please double check it out.',
                },
            ]);
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        user.password = undefined;
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true // only works on https!
        });
        return res.json(user);
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.signin = signin;
const getCurrentUser = async (req, res) => {
    var _a;
    try {
        // @ts-ignore: Unreachable code error
        let currentUser = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)
            .select('-password')
            .exec();
        return res.json(currentUser);
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.getCurrentUser = getCurrentUser;
const signout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({ msg: 'Signed out success.' });
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.signout = signout;

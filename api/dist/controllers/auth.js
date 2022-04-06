"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.resetPassword = exports.forgotPassword = exports.getCurrentUser = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nanoid_1 = require("nanoid");
const courier_1 = require("@trycourier/courier");
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const isEmail_1 = __importDefault(require("../utils/isEmail"));
const courier = (0, courier_1.CourierClient)({
    authorizationToken: process.env.COURIER_API_KEY,
});
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
            .select('-password -passwordResetCode')
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
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const shortCode = (0, nanoid_1.nanoid)(6).toUpperCase();
        const user = await User_1.default.findOneAndUpdate({ email }, { passwordResetCode: shortCode }).exec();
        if (!email) {
            return res.status(422).json('Email must be provided.');
        }
        else if (!(0, isEmail_1.default)(email)) {
            return res.status(400).json('Invalid email address.');
        }
        if (!user) {
            return res
                .status(400)
                .json('Oops!, it seems that user does not exists.');
        }
        // send email to user
        await courier.send({
            message: {
                to: {
                    email,
                    data: {
                        shortCode,
                    },
                },
                template: process.env.COURIER_TEMPLATE_ID,
                data: { variables: 'shortCode' },
            },
        });
        return res.json({ ok: true });
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        let user = await User_1.default.findOne({ email }).exec();
        if (code.toString() !== (user === null || user === void 0 ? void 0 : user.passwordResetCode.toString())) {
            return res.status(400).json('Invalid secret code.');
        }
        let hashedPassword = await (0, auth_1.hashPassword)(newPassword);
        await User_1.default.findOneAndUpdate({ email, passwordResetCode: code }, {
            password: hashedPassword,
            passwordResetCode: '',
        }).exec();
        return res.json({ ok: true });
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.resetPassword = resetPassword;
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

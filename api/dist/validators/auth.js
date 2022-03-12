"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areValidAuthInputs = void 0;
const isEmail_1 = __importDefault(require("../utils/isEmail"));
const areValidAuthInputs = (req, res, next) => {
    const { name, email, password } = req.body;
    let errors = [];
    if (req.originalUrl === '/api/auth/signup' && (!name || name.length < 2)) {
        errors.push({
            param: 'name',
            msg: 'Name must be provided and at least 2 characters long.',
        });
    }
    if (!email) {
        errors.push({ param: 'email', msg: 'Email must be provided.' });
    }
    else if (!(0, isEmail_1.default)(email)) {
        errors.push({
            param: 'email',
            msg: 'Please provide a valid email address.',
        });
    }
    if (!password || password.length < 6) {
        errors.push({
            param: 'password',
            msg: 'Password must be provided and at least 6 characters long.',
        });
    }
    if (errors.length) {
        return res.status(422).json(errors);
    }
    next();
};
exports.areValidAuthInputs = areValidAuthInputs;

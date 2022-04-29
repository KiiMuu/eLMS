"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountStatus = exports.becomeInstructor = void 0;
const User_1 = __importDefault(require("../models/User"));
const stripe_1 = __importDefault(require("stripe"));
const query_string_1 = __importDefault(require("query-string"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
});
const becomeInstructor = async (req, res) => {
    var _a;
    try {
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).exec();
        if (!(user === null || user === void 0 ? void 0 : user.stripe_account_id)) {
            const account = await stripe.accounts.create({ type: 'express' });
            // That's the non-null assertion operator. It is a way to tell the compiler
            // "this expression cannot be null or undefined here.
            user.stripe_account_id = account.id;
            user === null || user === void 0 ? void 0 : user.save();
        }
        let accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: 'account_onboarding',
        });
        accountLink = Object.assign(accountLink, {
            'stripe_user[email]': user === null || user === void 0 ? void 0 : user.email,
        });
        return res.json(`${accountLink.url}?${query_string_1.default.stringify(accountLink)}`);
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.becomeInstructor = becomeInstructor;
const getAccountStatus = async (req, res) => {
    var _a;
    try {
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).exec();
        const account = await stripe.accounts.retrieve(user.stripe_account_id);
        if (!account.charges_enabled) {
            return res.status(401).json('Unauthorized');
        }
        else {
            const statusUpdated = await User_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user.id, {
                stripe_seller: account,
                $set: { role: 'instructor' },
            }, { new: true })
                .select('-password')
                .exec();
            res.json(statusUpdated);
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: error.message,
        });
    }
};
exports.getAccountStatus = getAccountStatus;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const middleware_1 = require("../middleware");
const auth_2 = require("../validators/auth");
let router = (0, express_1.Router)();
router.post('/auth/signup', auth_2.areValidAuthInputs, auth_1.signup);
router.post('/auth/signin', auth_2.areValidAuthInputs, auth_1.signin);
router.get('/auth/current', middleware_1.requireSignin, auth_1.getCurrentUser);
router.post('/password/forgot', auth_1.forgotPassword);
router.post('/password/reset', auth_2.validateResetPasswordFields, auth_1.resetPassword);
router.get('/auth/signout', auth_1.signout);
exports.default = router;

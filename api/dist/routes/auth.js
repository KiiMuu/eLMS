"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../validators/auth");
let router = (0, express_1.Router)();
router.post('/auth/signup', auth_2.areValidSignupInputs, auth_1.signup);
exports.default = router;

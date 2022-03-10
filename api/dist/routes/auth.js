"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
let router = (0, express_1.Router)();
router.post('/auth/signup', auth_1.signup);
exports.default = router;

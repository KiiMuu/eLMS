"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instructor_1 = require("../controllers/instructor");
const middleware_1 = require("../middleware");
let router = (0, express_1.Router)();
router.post('/user/become-instructor', middleware_1.requireSignin, instructor_1.becomeInstructor);
router.get('/user/account-status', middleware_1.requireSignin, instructor_1.getAccountStatus);
exports.default = router;

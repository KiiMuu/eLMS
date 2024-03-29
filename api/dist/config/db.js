"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
class Database {
    constructor() {
        this.connect();
    }
    async connect() {
        try {
            const conn = await mongoose_1.default.connect(`${process.env.DB_URL}`);
            console.log(`DB connected: ${conn.connection.host}`);
        }
        catch (error) {
            console.log(`ERROR: ${error.message}`);
            process.exit(1);
        }
    }
}
const connectToDB = new Database();
exports.default = connectToDB;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() { }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    async connect() {
        try {
            const mongoUrl = process.env.MONGO_URL;
            if (!mongoUrl)
                throw new Error("MONGO_URL is not defined in .env");
            await mongoose_1.default.connect(mongoUrl);
            console.log(" MongoDB connected Database class");
        }
        catch (err) {
            console.error(" MongoDB connection error:", err);
        }
    }
    async disconnect() {
        try {
            await mongoose_1.default.disconnect();
            console.log("🛑 MongoDB disconnected");
        }
        catch (err) {
            console.error("❌ MongoDB disconnection error:", err);
        }
    }
}
exports.default = Database;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const content_route_1 = require("./routes/content.route");
const createApp_1 = require("./lib/createApp");
exports.app = (0, createApp_1.createApp)();
exports.app.register(content_route_1.contentRoutes, { prefix: "/api/v1/content" });

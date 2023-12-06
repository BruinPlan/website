"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("./app/server.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const domain = process.env.DB_HOST;
const port = process.env.PORT;
const server = new server_js_1.Server();
server.start(domain, port);

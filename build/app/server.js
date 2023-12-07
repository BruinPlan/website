"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const router_js_1 = require("./router.js");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const passport_1 = __importDefault(require("passport"));
require("./passport.js");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        // enable cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        // session middleware
        this.app.use((0, express_session_1.default)({
            secret: 'cats',
            resave: false, // Set to false to avoid unnecessary session saves
            saveUninitialized: false // Set to false to avoid storing uninitialized sessions
        }));
        // Passport middleware
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        // api
        this.app.use('/api', router_js_1.apiRouter);
        this.app.use('/auth', router_js_1.authRouter);
        // handle errors
        this.app.use((err, req, res, next) => {
            console.log(err.stack);
            res.status(500).send('Something broke!');
        });
        // load frontend
        const frontendPath = path_1.default.resolve("./") + "/build/frontend";
        this.app.use(express_1.default.static(frontendPath));
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(frontendPath, '/index.html'));
        });
    }
    // start server
    start(domain, port) {
        this.app.listen(port, domain, () => {
            console.log(`Server is listening at http://${domain}:${port}`);
        });
    }
}
exports.Server = Server;

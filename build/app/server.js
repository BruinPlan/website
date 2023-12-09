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
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
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
            // key: 'session_cookie_name',
            secret: 'session_cookie_secret',
            // store: new MySQLStore({
            //   host: process.env.DB_HOST,
            //   port: process.env.PORT,
            //   user: process.env.DB_USER,
            //   password: process.env.DB_PASS,
            //   database: 'sessions',
            // }),
            resave: false, // Set to false to avoid unnecessary session saves
            saveUninitialized: false, // Set to false to avoid storing uninitialized sessions
            cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
        }));
        // Passport middleware
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        // this.app.use(cors({ origin: 'http://127.0.0.1:3000', methods: "GET,POST,PUT,DELETE", credentials: true }))
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

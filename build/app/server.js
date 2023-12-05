"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const router_js_1 = __importDefault(require("./router.js"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(app) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        // enable cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        // api
        this.app.use('/api', router_js_1.default);
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

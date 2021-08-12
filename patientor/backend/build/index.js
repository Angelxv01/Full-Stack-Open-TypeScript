"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = 3001;
app.use(express_1.default.json(), cors_1.default());
app.get('/api/ping', (_req, res) => {
    return res.send('pong');
});
app.get('*', (_req, res) => {
    console.error('There route does not exist');
    return res.status(404).send('There route does not exist');
});
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

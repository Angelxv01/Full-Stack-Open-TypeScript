"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 4000;
app.use(express_1.default.json());
app.get('/ping', (_req, res) => {
    res.send('pong');
});
app.listen(PORT, () => console.log(`app listening on port ${PORT}`));

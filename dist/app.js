"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DB_1 = __importDefault(require("./Connect/DB"));
const path_1 = __importDefault(require("path"));
// import MangementRoute from "./Routes/Route"
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.PORT);
class App {
    constructor(port) {
        this.app = (0, express_1.default)(),
            this.PORT = port,
            this.DB = DB_1.default.getInstance(),
            this.middleWare();
        this.route();
    }
    middleWare() {
        this.app.use(express_1.default.json());
        this.app.set("view engine", "ejs");
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    route() {
        // const mangementRoute = new MangementRoute();
        // this.app.use("/", mangementRoute.router);
    }
    async Start() {
        try {
            await this.DB.connect();
            this.app.listen(this.PORT, () => {
                console.log(`http://localhost:${this.PORT}`);
            });
        }
        catch (error) {
            console.log(`error occur on the serevr runing due to : ${error}`);
        }
    }
}
// const app = new App()

import express,{Application} from "express"
import ConnectDB from "./Connect/DB"
import path from "path"
// import MangementRoute from "./Routes/Route"
import dotenv from "dotenv";
dotenv.config();

class App{
    private app :Application;
    private DB :  ConnectDB;
    private PORT:number ;
    constructor(port:number){
        this.app = express(),
        this.PORT = port,
        this.DB = ConnectDB.getInstance(),
        this.middleWare()
        this.route()     
    }
    private middleWare():void{
    this.app.use(express.json())
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
    this.app.use(express.urlencoded({ extended: true }));
    }
    private route():void{
    // const mangementRoute = new MangementRoute();
    // this.app.use("/", mangementRoute.router);
    }
    public async Start():Promise<void>{
        try{
            await  this.DB.connect()
        this.app.listen(this.PORT,()=>{
            console.log(`http://localhost:${this.PORT}`)
        })
        }catch(error){
            console.log(`error occur on the serevr runing due to : ${error}`)
        }


    }
}       
const port = Number(process.env.PORT)
const app = new App(port)
app.Start()

                              
import express from 'express';
import {config} from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import messageRouter from "./router/messageRouter.js";

 
const app = express();
config({path:"./config/config.env"})

app.use(  //-------frontend and backend ko connect karne ke liye use karte hen cors ko
    cors({
      origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );

app.use(cookieParser()); //iski madad se hum apni cooki ko get karenge

app.use(express.json()); //----jo bhi data aata he bo json format me hota he use as a string paas karne ke liye ise use karte hen

app.use(express.urlencoded({extended:true}))  //jo bhi string data hum frontend se backend me bhejengen usko recognize karne ke kaam aata he 

app.use(    //---------------iski madad se file upload hongin
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

  app.use("/api/v1", messageRouter);

dbConnection();  //---ye database se connect kara rha he


export default app;

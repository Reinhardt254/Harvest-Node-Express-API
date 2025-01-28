import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import http from "http";

const app = express();

app.use(cors({
   credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(express.json())

dotenv.config();

const server = http.createServer(app);
const port = 3000;

server.listen(port, () => {
   console.log(`server running on port ${port}`)
});


import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import http from "http";
import router from "./routes"
import passport from "./middlewares"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const app = express();

// Initialize passport middleware
app.use(passport.initialize());

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

app.use("/", router())


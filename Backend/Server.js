import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import coachRouter from "./routes/coachRouter.js";
import loginRouter from "./routes/loginRouter.js";
import morgan from "morgan";
import bookingRoute from "./routes/bookingRoute.js";
import passport from "passport";
// import vedioRoter from "./routes/vedioRoute.js";
/////////////////////////////////////
// import http from "http"
// import { Server } from "socket.io";
/////////////////////////////////////

const app = express();
dotenv.config();
app.use(morgan('dev'));
const port = process.env.PORT
///////////////////////////////////////
// const server=createServer(app);
///////////////////////////////////


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();

app.use(cors({
  origin: 'http://localhost:5174', 
  credentials: true,              
}));

//////////////////////////////////////
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });
////////////////////////////////

app.use("/api/user",userRouter)
app.use("/api/coach",coachRouter)
app.use("/api/admin",adminRouter)
app.use("/api/l",loginRouter)
app.use("/api/b",bookingRoute)
// app.use("/api",vedioRoter)

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});


app.listen(port, () => {
  console.log(`server running on localhost ${port}`);
});


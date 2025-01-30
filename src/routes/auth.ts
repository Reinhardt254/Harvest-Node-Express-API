import express from "express";
import passport from "../middlewares/index";
import { authController } from "../controllers/auth";

export default (router: express.Router) => {
  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/protected", passport.authenticate("jwt", { session: false }),
   (req, res) => {
     res.json({ message: "This is a protected route", user: req.user });
   }
 );
};

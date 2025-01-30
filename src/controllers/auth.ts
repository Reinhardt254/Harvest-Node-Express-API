import { Request, Response } from "express";
import { authService } from "../services/authentication";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.register(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();

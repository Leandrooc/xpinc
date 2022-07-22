import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  private readonly loginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await this.loginService.auth(email, password);
    return res.status(200).json({ token });
  }
}

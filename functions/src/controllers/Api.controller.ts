import { Request, Response } from "express";

export class ApiController {
  public routes(req: Request, res: Response) {
    res.send('Hello World');
  }
}

export const apiController = new ApiController();

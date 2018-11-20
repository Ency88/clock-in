import { Request, Response } from "express";

export class MonthlyReportsController {
  public routes(req: Request, res: Response) {
    res.send('Monthly Reports');
  }
}

export const monthlyController = new MonthlyReportsController();

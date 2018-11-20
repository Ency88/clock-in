import * as express from "express";
import { monthlyController } from "../controllers/MonthlyReports.controller";

class MonthlyReportsRoute {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get("/", (req: express.Request, res: express.Response) =>
      monthlyController.routes(req, res)
    );
  }
}

export const monthlyReportsRoute = new MonthlyReportsRoute().router;

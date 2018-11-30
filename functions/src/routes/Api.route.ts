import * as express from 'express';
import {monthlyController} from '../controllers/MonthlyReports.controller';

class ApiRoute {
  public router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get('/monthlyReports', (req, res): void => {
        monthlyController.routes(req, res);
    });
  }
}

export const apiRoute = new ApiRoute().router;
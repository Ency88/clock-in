import * as express from 'express';
import {monthlyController} from '../controllers/MonthlyReports.controller';
import {apiController} from '../controllers/Api.controller';

class ApiRoute {
  public router: express.Router = express.Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get('/', (req: express.Request, res: express.Response) =>
      apiController.routes(req, res)
    );
    this.router.get('/monthlyReports', (req: express.Request, res: express.Response) =>
      monthlyController.routes(req, res)
    );
  }
}

export const apiRoute = new ApiRoute().router;

import * as admin from 'firebase-admin';

export class MonthlyReportsController {
    public routes(req, res) {
        const date_start = req.data.from;
        const date_end = req.data.to;
        
        const database = admin.database();
        const ref = database.ref("worktimes");
        ref.orderByValue().startAt(date_start).endAt(date_end).once("child_added", (snapshot) => {
            res.send(snapshot.val());
        });
    }
}

export const monthlyController = new MonthlyReportsController();
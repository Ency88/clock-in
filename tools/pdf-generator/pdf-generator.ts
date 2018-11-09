import * as mustache from 'mustache';
import * as fs from 'fs';
import * as pdf from 'html-pdf';

export default class PdfGenerator {
  private data;

  constructor() {
    this.data = {
      name: 'John Doe',
      times: [...Array(30)].map(() => ({
        date: '15. 5. 2018',
        start: '08:00',
        end: '17:00',
        pause: '00:30',
        total_time: '08:30',
        project_name: 'Projekt Internes',
      })),
      reporter_datetime: '15:55 12.3.2018',
      human_resources_datetime: '15:55 12.3.2018',
      reporter_signature: 'John Doe',
      human_resources_signature: 'HR RESOURCES',
    };
  }

  public run(): Promise<string> {
    const content = fs.readFileSync('invoice-tpl.html', 'utf-8');
    const output = mustache.render(content, this.data);
    const options = { format: 'Letter' };

    return new Promise<string>((resolve, reject) => {
      pdf.create(output, options).toFile('./report.pdf', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}

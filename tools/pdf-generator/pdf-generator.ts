import * as mustache from 'mustache';
import * as pdf from 'html-pdf';
import { promise } from 'selenium-webdriver';
import { template } from './invoice-tpl';
import Promise = promise.Promise;

export class PdfGenerator {
  private data;

  constructor() {
    this.data = {
      name: 'John Doe',
      times: this.getDaysData(),
      reporter_datetime: '15:55 12.3.2018',
      human_resources_datetime: '15:55 12.3.2018',
      reporter_signature: 'John Doe',
      human_resources_signature: 'July Smith',
    };
  }

  private getDaysData() {
    const result = [];
    for (let i = 1; i < 32; i++) {
      result.push({
        date: `${i}. 5. 2018`,
        start: '08:00',
        end: '17:00',
        pause: '00:30',
        total_time: '08:30',
        project_name: 'Projekt Internes',
      });
    }
    return result;
  }

  public run(): Promise<string> {
    const output = mustache.render(template, this.data);
    const options = {
      format: 'A4',
      border: '10mm',
      header: { height: '25mm' },
      footer: { height: '15mm' },
    };

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

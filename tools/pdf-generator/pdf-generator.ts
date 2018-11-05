const mustache = require('mustache');
const fs = require('fs');
const pdf = require('html-pdf');

class PdfGenerator {
  private _content;
  private _data;

  constructor() {
    this._content = '';
    this._data = {
      name: 'John Doe',
      times: [
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
        {
          date: '15. 5. 2018',
          start: '08:00',
          end: '17:00',
          pause: '00:30',
          total_time: '08:30',
          project_name: 'Projekt Internes',
        },
      ],
      reporter_datetime: '15:55 12.3.2018',
      human_resources_datetime: '15:55 12.3.2018',
      reporter_signature: 'John Doe',
      human_resources_signature: 'HR RESOURCES',
    };
  }

  run() {
    this._content = fs.readFileSync('invoice-tpl.html', 'utf-8');
    const view = this._data;
    const output = mustache.render(this._content, view);
    const options = { format: 'Letter' };

    pdf.create(output, options).toFile('./report.pdf', function(err, res) {
      if (err) {
        return console.log(err);
      }
      console.log(res);
    });
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }
}

module.exports = PdfGenerator;

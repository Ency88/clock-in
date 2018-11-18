// noinspection TsLint
export const template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <style>
    body {
      font-size: 12px;
    }
    /* Header */
    .wrapper-header {
      display: -webkit-flex;
      -webkit-flex-direction: row;
      -webkit-justify-content: space-between;
    }

    .wrapper-header div:first-child {
      display: -webkit-flex;
      -webkit-flex-direction: column;
      -webkit-flex-grow: 1;
    }

    .wrapper-header div:first-child span {
      padding-top: 2px;
    }

    .wrapper-header div:last-child {
      width: 200px;
    }

    .wrapper-header div:last-child img {
      width: 100%;
    }

    /* Content */
    .wrapper-content table {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
      margin-top: 25px;
    }

    .wrapper-content table td {
      border: 1px solid gray;
      text-align: center;
      padding: 1px 0;
    }

    /* Footer */
    .wrapper-footer {
      display: -webkit-flex;
      -webkit-flex-direction: row;
      -webkit-justify-content: space-around;
    }

    .wrapper-footer div {
      display: -webkit-flex;
      -webkit-flex-basis: 50%;
      -webkit-flex-direction: column;
      -webkit-align-items: center;
    }

    .wrapper-footer div span:first-child {
      padding-bottom: 2px;
    }
  </style>
</head>
<body>

  <header id="pageHeader">
    <div class="wrapper-header">
      <div>
        <span>Report</span>
        <span>Due to: <strong>{{ report_date }}</strong></span>
        <span>Person: <strong>{{ name }}</strong></span>
      </div>
      <div>
        <img src="data:image/png;base64,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" />
      </div>
    </div>
  </header>

  <div class="wrapper-content">
    <table>
      <thead>
        <th>Date</th>
        <th>Start</th>
        <th>End</th>
        <th>Pause</th>
        <th>Total Time</th>
        <th>Project Name</th>
      </thead>
      <tbody>
      {{ #times }}
      <tr>
        <td>{{ date }}</td>
        <td>{{ start }}</td>
        <td>{{ end }}</td>
        <td>{{ pause }}</td>
        <td>{{ total_time }}</td>
        <td>{{ project_name }}</td>
      </tr>
      {{ /times }}
      </tbody>
    </table>
  </div>

  <footer id="pageFooter">
    <div class="wrapper-footer">
      <div>
        <span>{{ reporter_signature }}</span>
        <span>{{ reporter_datetime }}</span>
      </div>
      <div>
        <span>{{ human_resources_signature }}</span>
        <span>{{ human_resources_datetime }}</span>
      </div>
    </div>
  </footer>

</body>
</html>
`;

import PdfGenerator from './pdf-generator';

const pdfgenerator_instance = new PdfGenerator();

pdfgenerator_instance
  .run()
  .then(value => console.log(value))
  .catch(err => console.log(err));

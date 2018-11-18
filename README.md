[![Build Status](https://travis-ci.org/Ency88/clock-in.svg?branch=master)](https://travis-ci.org/Ency88/clock-in)

# ClockIn
ClockIn is time management application for tracking working hours. (Senacor team project)


## Development

### Firebase Credentials
Update firebase environment variables with your credentials in *src/environments/environment.ts*

### Cloud Functions
- Make sure you have firebase-tools installed: `npm install -g firebase-tools`
- Install dependencies: `cd functions/ && npm install`
- Login into your firebase account: `firebase login` 
- Add your firebase project: `firebase use --add <your-project-id>`
- Deploy functions: `firebase deploy --only functions`

### Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## PDF-Generator
Install dependencies: `npm install -g ts-node typescript`  
Generate example PDF: `npm run generate-pdf:local`

---

### Further help

[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)  
[Firebase](https://firebase.google.com/docs/web/setup)  
[Firebase Cloud Functions](https://firebase.google.com/docs/functions/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

# CodixTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

====================================================================

# Entry Level WEB app project

## DESCRIPTION
The application must provide basic functionalities. Access to all application resources must be behind registration and login only. It’s up to developer decision how to store data on the backend. Test should be implemented too. 
## TECHNOLOGIES

## Front-End 
Angular 2+ framework (https://angular.io/)
Bootstrap (http://getbootstrap.com/) or similar framework
No jQuery framework usage

## Back-End
RESTful API – HTTP access control (CORS) with JSON objects
Any server-side (Node.js, PHP, JAVA, .NET etc.)
No requirements about data storage, use anything appropriate

## DESCRIPTION
The application shall be single-page based and to work under all modern browsers. The application must contains following modules/functionalities/pages:

## Registration form
Nickname – varchar(40), unique
Password – varchar(40)
Confirm password – varchar(40)
Email – varchar(40), unique
Phone – numeric(15)
Country – predefined drop-down list
All fields have to be required. Registration process must validate entered data on front-end level and notify the user for missing data, wrong format or already existing mail/nickname into database. The application must login and redirect the user to the main page automatically after successful registration.

## Login
username
password
remember me (checkbox)

## User details 
– user must have ability to update all his personal details except email address. Nickname uniqueness requirement remains valid.


## Logout

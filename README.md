This is a MVP implementation of the Mobile Billing Demo project

### Requirements
1. NodeJS 10 (Not tested on lower versions)
2. Sails 1.0 (installed globally)

### Preliminarily
seed initial data on the project's folder:

`sails run init-populate`

### Credentials after populating
- login: `ivanov@gmail.com`
- password: `ivanov`

### Important folders of the project
1. api - the main part of the backend;
2. assets/src - the frontend part.

### Starting project
1. Start back and front part in parallel: `npm start`
2. Start only back: `sails lift`
3. Start only front: `npm run open:client`

### Reasons for using main libraries
1. Sails - a solid nodejs framework with good ORM and an ability to mock database
2. React - an input requirement;
3. Mobx - an easy to integrate state management library, allowing to reduce boilerplate code;
4. Webpack - the most popular and mature bundler;
5. Lodash - a convinient helpers library.

### What should be changed in the production version of the project
1. Splitting frontend and backend part (If it is assumed that the project will be large enough in the future);
2. To containerize the application (Docker);
3. Improving security - better implementation JWT storing and checking, expiring and refreshing tokens, setup of the CORS, store credentials only in env variables;
4. Use a serious database (relational or not);
5. Strong typing (TypeScript);
6. Optimize production and development frontend bundles(source maps, tree shaking, etc.);
7. Unit tests (Jest + Enzyme, Sails unit tests);
8. Tune up linter and prettifier;
9. Bring all code to a single style;
10. Setup variables for different environments;
11. Move reusable in different places constants in separate modules;
12. Maybe: add e2e test (TestCaffee);
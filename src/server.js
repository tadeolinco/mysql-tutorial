import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './router';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// only use a logger if the server is in a development environment
// see the package.json in the "start" script to see how to set the environment
if (process.env.NODE_ENV === 'development') {
  // logger in 'dev' mode let's you see all routes being in real time at the console
  app.use(logger('dev'));
}

// see src/router.js
app.use('/api', router);
// let's the app load the apidoc generated from "npm run apidoc"
app.use(express.static(path.join(__dirname, '../apidoc')));

// port will take process.env.PORT if it exists
// if not, 3001
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});

export default server;

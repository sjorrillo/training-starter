import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { configureRoutes } from './routes';

const app = express();
const apiPort = process.env.PORT || 3300;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true, limit: '10000mb' }));
app.use(bodyParser.json({ limit: '10000mb' }));

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
configureRoutes(router, {});
app.use('/api', cors(), router);

// Start the server
app.listen(apiPort, err => {
  if (err) {
    console.log(`API failed to start on port ${apiPort}`, err);
    return;
  }

  console.log(`API is running on port ${apiPort}`);
});

export default app;

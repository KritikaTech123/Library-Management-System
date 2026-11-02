import serverless from 'serverless-http';
import app from '../../backend/src/server.js';
import { initializeDatabase } from '../../backend/src/config/db.js';

let initialized = false;
let initializationPromise;

const initialize = async () => {
  if (!initialized) {
    initializationPromise = initializationPromise || initializeDatabase();
    await initializationPromise;
    initialized = true;
  }
};

const handler = serverless(async (req, res) => {
  await initialize();
  return app(req, res);
});

export { handler };

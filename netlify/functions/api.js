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
  try {
    await initialize();
    return app(req, res);
  } catch (error) {
    console.error('[Netlify API] Initialization failed:', error);
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      message: 'Library API is temporarily unavailable.'
    }));
  }
});

export default handler;
export { handler };

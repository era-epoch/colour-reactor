import bodyParser from 'body-parser';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import path from 'path';

const app = express();

const env = process.env.NODE_ENV;

console.log(`Server running in ${env} mode!`);

// parse application/json
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Fallback route
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Express server listening...
const port = process.env.PORT || 3000;

const server = createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

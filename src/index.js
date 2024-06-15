import 'dotenv/config';
import express from 'express';
import { glob } from 'glob';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3001;
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

glob.sync('**/*.route.js', { cwd: __dirname })
  .forEach(async file => {
    const routerModule = await import(`./${file}`);
    app.use('/api', routerModule.default);
  });

app.use(cors({
  origin: [ 'http://localhost:3000', 'https://nomadconnect-frontend.onrender.com/' ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
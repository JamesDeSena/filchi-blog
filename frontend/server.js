import express from 'express';
import fs from 'fs';
import path from 'path';
import { render } from './dist-ssr/entry-server.js';

const app = express();
const port = 3000;

const __dirname = path.resolve();
const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');

app.use('/assets', express.static(path.resolve(__dirname, 'dist/assets')));

app.get('*', (req, res) => {
  const context = {};
  const { html, helmet } = render(req.url, context);

  const responseHtml = template
    .replace(`<!--app-html-->`, html)
    .replace(`<!--helmet-title-->`, helmet.title.toString())
    .replace(`<!--helmet-meta-->`, helmet.meta.toString());

  res.send(responseHtml);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

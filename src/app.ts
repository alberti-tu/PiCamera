import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import * as camera from './services/camera';
import { configuration } from './config';

const app = express();

app.listen(configuration.server.port, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.port);
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Backend routes
app.get('/photo', (req, res) => camera.takePhoto().then(data => res.send(data)));

/*
// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(path.resolve('public/' + req.url));
    else res.sendFile(path.resolve('public/index.html'));
});
*/
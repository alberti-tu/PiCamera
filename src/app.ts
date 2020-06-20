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
app.get('/video', (req, res) => camera.takeVideo().then(data => res.send('ok')));

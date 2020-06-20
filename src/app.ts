import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

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
app.get('/', (req, res) => camera.takePhoto().then(data => res.send('<img src="' + data + '">')));

app.get('/00', (req, res) => camera.takePhoto({ save: false, rotate: false }).then(data => res.send('<img src="' + data + '">')));
app.get('/01', (req, res) => camera.takePhoto({ save: false, rotate: true }).then(data => res.send('<img src="' + data + '">')));
app.get('/10', (req, res) => camera.takePhoto({ save: true, rotate: false }).then(data => res.send('<img src="' + data + '">')));
app.get('/11', (req, res) => camera.takePhoto({ save: true, rotate: true }).then(data => res.send('<img src="' + data + '">')));

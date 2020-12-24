import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import { configuration } from './config';

import * as authentication from './middlewares/authentication.middlewares';
import * as camera from './middlewares/camera.middlewares';
import * as database from './middlewares/database.middlewares';

database.init();

const app = express();

app.listen(configuration.server.port, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.port);
});

app.use(cors());
app.use(helmet());

app.get('/camera/:id', authentication.verifyCameraToken, camera.setup);
app.post('/camera/:id', authentication.verifyCameraToken, camera.register);
app.put('/camera/:id', authentication.verifyUserToken, camera.update);
app.delete('/camera/:id', authentication.verifyUserToken, camera.remove);

// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(path.resolve('public/' + req.url));
    else res.sendFile(path.resolve('public/index.html'));
});
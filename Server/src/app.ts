import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import { configuration } from './config';

import * as authentication from './middlewares/authentication.middlewares';
import * as camera from './middlewares/camera.middlewares';
import * as database from './middlewares/database.middlewares';
import * as subscriptions from './middlewares/subscriptions.middlewares';

database.init();

const app = express();

app.listen(configuration.server.port, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.port);
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }))

app.post('/api/user/login', authentication.login);

app.get('/api/subscription', authentication.verifyToken, subscriptions.selectAll);
app.post('/api/subscription/:id', authentication.verifyToken, subscriptions.insert);
app.put('/api/subscription', authentication.verifyToken, subscriptions.update);
app.delete('/api/subscription/:id', authentication.verifyToken, subscriptions.remove);

app.get('/api/camera/:id', authentication.getCameraId, camera.selectOne);
app.post('/api/camera/:id', authentication.getCameraId, camera.insert);
// app.put('/api/camera/:id', authentication.verifyToken, authentication.getCameraId, camera.update);
// app.delete('/api/camera/:id', authentication.verifyToken, authentication.getCameraId, camera.remove);

app.post('/api/camera/picture/:id', authentication.getCameraId, camera.picture);

// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile( resolveClient('App/out/' + req.url, 1) );
    else res.sendFile( resolveClient('App/out/index.html', 1) );
});

function resolveClient(url: string, back: number = 0): string {
    back = back >= 0 ? back : (-1) * back; 
    const base = path.resolve().split('/');
    base.splice(base.length - back)
    return base.join('/') + '/' + url;
}

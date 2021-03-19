import SocketIO, { Server, Socket } from 'socket.io';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import path from 'path';

import { configuration } from './config';

import * as authentication from './middlewares/authentication.middlewares';
import * as camera from './middlewares/camera.middlewares';
import * as database from './middlewares/database.middlewares';
import * as picture from './middlewares/picture.middlewares';
import * as socket from './middlewares/socket.middlewares';
import * as subscriptions from './middlewares/subscriptions.middlewares';

database.init();

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));

const server = http.createServer(app).listen(configuration.server.port, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.port);
});

const io: Server = SocketIO(server);
io.on('connection', (client: Socket) => socket.connection(io, client));

// Client - Backend routes
app.get('/api/camera/:id', authentication.getCameraId, authentication.decodeCameraId, camera.selectOne);
app.post('/api/camera/:id', authentication.getCameraId, authentication.decodeCameraId, camera.insert);

app.post('/api/camera/picture/:id', authentication.getCameraId, authentication.decodeCameraId, camera.picture);

// App - Backend routes
app.post('/api/user/login', authentication.login);
app.post('/api/user/register', authentication.register);

app.get('/api/subscription', authentication.getUserId, subscriptions.selectAll);
app.get('/api/subscription/:id', authentication.getUserId, authentication.getCameraId, subscriptions.selectOne);
app.post('/api/subscription/:id', authentication.getUserId, authentication.getCameraId, subscriptions.insert);
app.put('/api/subscription', authentication.getUserId, subscriptions.update);
app.delete('/api/subscription/:subscription', authentication.getUserId, subscriptions.remove);

app.get('/api/settings/camera/:id', authentication.getUserId, authentication.getCameraId, camera.selectOne);
app.post('/api/settings/camera/:id', authentication.getUserId, authentication.getCameraId, camera.update);

app.get('/api/settings/filters', authentication.getUserId, camera.filtersList);

app.get('/api/picture/:id', authentication.getUserId, authentication.getCameraId, picture.getFolderId);
app.post('/api/picture/:id', authentication.getUserId, authentication.getCameraId, picture.savePicture);
app.get('/api/picture/:id/:name', authentication.getUserId, authentication.getCameraId, picture.getPicture);
app.delete('/api/picture/:id/:name', authentication.getUserId, authentication.getCameraId, picture.removePicture);

// App - Frontend routes
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

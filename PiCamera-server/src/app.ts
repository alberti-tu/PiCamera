import bodyParser from 'body-parser';
import { Server, Socket } from 'socket.io';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import path from 'path';

import * as authController from './controllers/auth-middleware';
import * as cameraController from './controllers/camera-middleware';
import * as databaseController from './controllers/db-middleware';
import * as socketController from './controllers/socket-middleware';
import { configuration } from './config';

const app = express();

databaseController.init();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const server = http.createServer(app).listen(configuration.server.port, () => console.log('Server is listening on http://[...]:' + configuration.server.port) );
const io: Server = require('socket.io')(server);

io.on('connection', (socket: Socket) => socketController.connection(io, socket));

// Backend routes
app.post('/api/login', authController.login);

app.post('/api/user', authController.verifyToken, authController.registerAdmin);
app.delete('/api/user', authController.verifyToken, authController.deleteAdmin);

app.post('/api/camera/settings', authController.verifyToken, cameraController.cameraSettings);

// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(path.resolve('public/' + req.url));
    else res.sendFile(path.resolve('public/index.html'));
});
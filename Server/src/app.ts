import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import helmet from 'helmet';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import SocketIO from 'socket.io';

import { configuration } from './config';
import { ServerInstance } from './models/http.models';

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

configuration.server.instances.forEach(item => {
	createServer(app, item);
})

// Redirect ports
app.use((req, res, next) => {
	const [host, port] = req.headers.host.split(':')
	const server = configuration.server.instances.find(item => {
		if (port == undefined) {
			const type = req.secure ? 'https' : 'http';
			return item.type == type && item.redirect;
		} else {
			return item.port == +port;
		}
	});

	if (req.secure || server?.redirect == undefined || server?.port == server?.redirect) {
		next();
	} else {
		res.redirect('https://' + host + ':' + server.redirect + req.url);
	}
});

// Client - Backend routes
app.get('/api/camera/:id', authentication.getCameraId, authentication.decodeCameraId, camera.selectOne);
app.post('/api/camera/:id', authentication.getCameraId, authentication.decodeCameraId, camera.insert);

app.post('/api/camera/picture/:id', authentication.getCameraId, authentication.decodeCameraId, camera.picture);

// App - Backend routes
app.post('/api/user/login', authentication.login);
app.post('/api/user', authentication.register);

app.get('/api/user', authentication.getUserId, authentication.selectOne)
app.put('/api/user', authentication.getUserId, authentication.update);
app.delete('/api/user', authentication.getUserId, authentication.remove);

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
	if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(resolveClient('App/out/' + req.url, 1));
	else res.sendFile(resolveClient('App/out/index.html', 1));
});

function createServer(app: Express, config: ServerInstance): void {
	if (config.type == 'http') {
		try {
			const server = http.createServer(app).listen(config.port, () => {
				console.log('Server is listening on http://[...]:' + config.port);
			});
	
			const io = SocketIO(server);
			io.on('connection', client => socket.connection(io, client));
		} catch {
			console.log('\nError: Can not create the instance of ' + config.type + ' server at port ' + config.port);
		}
	} else if (config.options) {
		try {
			fs.statSync('../' + config.options?.key).isFile();
			fs.statSync('../' + config.options?.cert).isFile();
		} catch {
			console.log('\nERROR: SSL certificates can not be loaded');
			console.log('From the project root directory');
			console.log('Execute: npm run letsencrypt --host=[host]');
			console.log('or');
			console.log('Execute: npm run openssl --cert=' + config.options?.cert + ' --key=' + config.options?.key);
		}

		try {
			const options = {
				ca: fs.existsSync('../' + config.options?.ca) && fs.readFileSync('../' + config.options?.ca),
				cert: fs.readFileSync('../' + config.options?.cert),
				key: fs.readFileSync('../' + config.options?.key)
			};

			const server = https.createServer(options, app).listen(config.port, () => {
				console.log('Server is listening on https://[...]:' + config.port);
			});

			const io = SocketIO(server);
			io.on('connection', client => socket.connection(io, client));
		} catch {
			console.log('\nError: Can not create the instance of ' + config.type + ' server at port ' + config.port);
		}
	} else {
		console.log('\nError: Can not get options for the instance of ' + config.type + ' server at port ' + config.port);
	}
}

function resolveClient(url: string, back: number = 0): string {
	back = back >= 0 ? back : (-1) * back;
	const base = path.resolve().split('/');
	base.splice(base.length - back)
	return base.join('/') + '/' + url;
}

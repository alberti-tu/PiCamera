import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import helmet from 'helmet';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import pem from 'pem';
import SocketIO from 'socket.io';

import { configuration } from './config';
import { HttpsOptions, ServerInstance } from './models/http.models';

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
	const [host, port] = req.headers.host.split(':');

	const protocol = req.secure ? 'https' : 'http';

	const server = configuration.server.instances.find(item => {
		if (port) {
			return item.port == +port;
		} else {
			return item.port == (protocol == item.type ? 443 : 80);
		}
	});

	if (req.secure || !server?.redirect || server?.port == server?.redirect) {
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

async function createServer(app: Express, config: ServerInstance): Promise<void> {
	switch(config.type) {
		case 'http':
			try {
				const server = http.createServer(app).listen(config.port, () => {
					console.log('Server is listening on http://[...]:' + config.port);
				});

				const io = SocketIO(server);
				io.on('connection', client => socket.connection(io, client));
			} catch {
				console.log('\nError: Can not create the instance of ' + config.type + ' server at port ' + config.port);
			}
			break;
		case 'https':
			try {
				const certificate = await getCertificate(config.options);
	
				const server = https.createServer(certificate, app).listen(config.port, () => {
					console.log('Server is listening on https://[...]:' + config.port);
				});
	
				const io = SocketIO(server);
				io.on('connection', client => socket.connection(io, client));
			} catch {
				console.log('\nError: Can not create the instance of ' + config.type + ' server at port ' + config.port);
			}
			break;
	}
}

async function getCertificate(path: HttpsOptions): Promise<HttpsOptions> {
	try {
		return {
			ca: fs.existsSync(path.ca) && fs.readFileSync(path.ca),
			cert: fs.readFileSync(path.cert),
			key: fs.readFileSync(path.key),
		}
	} catch {
		return await new Promise<HttpsOptions>((resolve, reject) => {
			pem.createCertificate({ days: 365, selfSigned: true }, (err, keys) => {
				err && reject(err);
				resolve({ cert: keys.certificate, key: keys.serviceKey })
			});
		});
	}
}

function resolveClient(url: string, back: number = 0): string {
	back = back >= 0 ? back : (-1) * back;
	const base = path.resolve().split('/');
	base.splice(base.length - back)
	return base.join('/') + '/' + url;
}

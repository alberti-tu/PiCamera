import { DatabaseOptions } from "./services/database.services";
import { ServerOptions } from "./models/http.models";

interface Configuration {
	database: DatabaseOptions,
	server: ServerOptions
}

export const configuration: Configuration = {
	database: {
		database: 'PiCamera',
		user: 'root',
		password: null,
		host: 'localhost',
		port: 3306
	},
	server: {
		directory: 'camera',
		instances: [
			{
				port: 8080,
				redirect: 8443,
				type: 'http'
			},
			{
				options: {
					ca: '/etc/letsencrypt/live/[host]/chain.pem',
					cert: '/etc/letsencrypt/live/[host]/cert.pem',
					key: '/etc/letsencrypt/live/[host]/key.pem',
				},
				port: 8443,
				type: 'https'
			}
		],
		sharedKey: 'mycamera',  // Password to accept camera registration
		timeout: '365d'         // Expiration time of the authentication token
	}
}

export const filters: string[] = [
	'auto',
	'night',
	'backlight',
	'spotlight',
	'sports',
	'snow',
	'beach',
	'verylong',
	'fireworks'
];

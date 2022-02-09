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
		http: {
			port: 8080
		},
		https: {
			cert: 'certificate/server.cert',
			key: 'certificate/server.key',
			port: 8443
		},
		sharedKey: 'mycamera',  // Password to accept camera registration
		timeout: '1d'           // Expiration time of the authentication token
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

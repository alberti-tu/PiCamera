export interface ServerOptions {
	directory: string;
	instances: ServerInstance[];
	sharedKey: string;
	timeout: string;
}

export interface ServerInstance {
	domain?: string;
	port?: number;
	redirect?: number;
	type: 'http' | 'https';
}

export interface HttpsOptions {
	ca?: Buffer | string;
	cert: Buffer | string;
	key: Buffer | string;
}

export interface Token {
	id: string;
	iat: number;
	exp: number;
}

export interface Image {
	id: string;
	data: string;
}

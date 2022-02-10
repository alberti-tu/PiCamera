export interface Message<T> {
	code: number;
	message: HttpMessage;
	result: T;
}

export enum HttpMessage {
	Successful = 'Successful',      // code: 200
	NewItem = 'Inserted new item',  // code: 201
	NoContent = 'No content',       // code: 204
	BadRequest = 'Bad request',     // code: 400
	Unauthorized = 'Unauthorized',  // code: 401
	NotFound = 'Not found'          // code: 404
}

export interface ServerOptions {
	directory: string;
	instances: ServerInstance[];
	sharedKey: string;
	timeout: string;
}

export interface ServerInstance {
	options?: HttpsOptions;
	port: number;
	type: 'http' | 'https';
}

export interface HttpsOptions {
	cert: string;
	key: string;
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

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
	http?: HttpOptions;
	https?: HttpsOptions;
	sharedKey: string;
	timeout: string;
}

export interface HttpOptions {
	port: number;
}

export interface HttpsOptions {
	cert: string;
	key: string;
	port: number;
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

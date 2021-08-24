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

export interface CameraDTO extends CameraOptions {
	id?: string;
	timestamp?: Date;
}

export interface CameraOptions {
	filter?: string;
	quality?: number;
	rotation?: number;
}
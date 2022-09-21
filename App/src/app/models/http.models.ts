export interface Message<T> {
	code: number;
	message: string;
	result: T;
}

export interface ICameraOptions {
	filter?: string;
	quality?: number;
	rotation?: number;
}

export interface ICameraSubscription {
	id?: string;
	name?: string;
	camera_id?: string;
}

export interface ICameraOptions {
	filter?: string;
	quality?: number;
	rotation?: number;
}

export interface Image {
	id?: string;
	name?: string;
	data?: string;
}

export interface IUser {
	username?: string;
	password?: string;
}

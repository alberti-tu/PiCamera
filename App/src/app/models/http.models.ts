export interface Message<T> {
	code: number;
	message: string;
	result: T;
}

export interface CameraSubscription {
	id?: string;
	name?: string;
	camera_id?: string;
}

export interface Image {
	id?: string;
	name?: string;
	data?: string;
}

export interface CameraOptions {
	filter?: string;
	quality?: number;
	rotation?: number;
}

export interface CameraDTO extends CameraOptions {
	id?: string;
	timestamp?: Date;
}

export interface CameraOptions {
	filter?: string;
	quality?: number;
	rotation?: number;
}
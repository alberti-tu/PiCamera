export interface UserDTO {
    id?: string;
    username?: string;
    password?: string;
}

export interface CameraDTO extends PictureOptions {
    id?: string;
}

export interface PictureOptions {
    filter?: string;
    quality?: number;
    rotation?: number;
}

export interface FilterOptions {
    name?: string;
    value?: string;
}

export interface SubscriptionDTO extends CameraSubscription {
    user_id?: string;
}

export interface CameraSubscription {
    id?: string;
    name?: string;
    camera_id?: string;
}

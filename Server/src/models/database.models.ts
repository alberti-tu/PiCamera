export interface UserDTO {
    id?: string;
    username?: string;
    password?: string;
}

export interface CameraDTO extends PictureOptions {
    id?: string;
}

export interface FilterOptions {
    name?: string;
    value?: string;
}

export interface PictureOptions {
    filter?: string;
    quality?: number;
    rotation?: number;
}

export interface SubscriptionDTO {
    id?: string;
    name?: string;
    user_id?: string;
    camera_id?: string;
}
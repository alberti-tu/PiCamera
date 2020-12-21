export interface UserDTO {
    id: string;
    username: string;
    password: string;
}

export interface CameraDTO {
    id: string;
    filter: string;
    quality: number;
    rotation: number
}

export interface SubscriptionDTO {
    id: string;
    name: string;
    user_id: string;
    camera_id: string;
}
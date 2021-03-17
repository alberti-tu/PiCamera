export interface Message<T> {
    code: number;
    message: string;
    result: T;
}

export interface CameraSubscription {
    id: string;
    name: string;
    camera_id: string;
}

export interface FrameStream {
    id: string;
    name: string;
    data: string;
}

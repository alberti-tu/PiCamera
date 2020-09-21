export interface Response<T> {
    code: number; 
    message: string;
    result: T;
}

export interface PictureOptions {
    filter?: string;
    quality?: number;
    rotation?: number;
}
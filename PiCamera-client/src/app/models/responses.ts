export interface Response<T> {
    code: number; 
    message: string;
    result: T;
}

export interface Settings {
    filter: string;
    quality: number | string;
    rotation: '0' | '90' | '180' | '270';
}
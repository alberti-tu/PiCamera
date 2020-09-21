export interface Configuration {
    database: DatabaseOptions;    
    camera: CameraOptions;
    server: ServerOptions;
}

export interface CameraOptions extends PictureOptions {
    directory?: string;
}

export interface DatabaseOptions {
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
}

export interface PictureOptions {
    filter?: string;
    quality?: number;
    rotation?: number;
}

export interface ServerOptions {
    port: number;
    secret: string;
    timeout: string;   
}
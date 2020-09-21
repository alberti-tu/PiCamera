export interface Configuration {
    database: DatabaseOptions;    
    camera: CameraOptions;
    server: ServerOptions;
}

export interface CameraOptions extends PictureOptions {
    directory?: string;
}

export interface DatabaseOptions {
    name: string;
    user: string;
    password: string;
    host: string;
    port: number;
}

export interface PictureOptions {
    filter?: string;
    quality?: number | string;
    rotation?: '0' | '90' | '180' | '270';
    save?: boolean;
}

export interface ServerOptions {
    port: number;
    secret: string;
    timeout: string;   
}
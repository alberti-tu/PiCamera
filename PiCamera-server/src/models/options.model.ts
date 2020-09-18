export interface Configuration {
    database: DatabaseOptions;    
    camera: CameraOptions;
    server: ServerOptions;
}

export interface CameraOptions {
    directory: string;
}

export interface DatabaseOptions {
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
}

export interface PictureOptions {
    save?: boolean;
    quality?: string;
    rotate?: '0' | '90' | '180' | '270';
}

export interface ServerOptions {
    port: number;
    secret: string;
    timeout: string;   
}
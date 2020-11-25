export interface Configuration {
    camera: CameraOptions;
    database: DatabaseOptions;
    enviroment: Enviroment;   
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

export interface Enviroment {
    production: boolean
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

export interface ServerOptions {
    port: number;
    secret: string;
    timeout: string;   
}

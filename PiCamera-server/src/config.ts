import { Configuration } from './models/options.model';

export const configuration: Configuration = {
    database: {
        database: 'PiCamera',
        user: 'root',
        password: null,
        host: 'localhost',
        port: 3306
    },
    camera: {
        directory: 'camera',
        rotation: 180
    },
    server: {
        port: 8080,
        secret: 'secret',                                           // Key to encrypt authentication tokens
        timeout: '1d'                                               // Expiration time of the authentication token
    }
};

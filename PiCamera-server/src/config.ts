import { Configuration, FilterOptions } from './models/options.model';

export const configuration: Configuration = {
    camera: {
        directory: 'camera',
        rotation: 180
    },
    database: {
        database: 'PiCamera',
        user: 'root',
        password: null,
        host: 'localhost',
        port: 3306
    },
    enviroment: {
        production: true
    },
    server: {
        port: 8080,
        secret: 'secret',                                           // Key to encrypt authentication tokens
        timeout: '1d'                                               // Expiration time of the authentication token
    }
};

export const filters: FilterOptions[] = [
    { name: 'Seleccionar filtro', value: '' },
    { name: 'Automático', value: 'auto' },
    { name: 'Noche', value: 'night' },
    { name: 'Contraluz', value: 'backlight' },
    { name: 'Destacar', value: 'spotlight' },
    { name: 'Deportes', value: 'sports' },
    { name: 'Nieve', value: 'snow' },
    { name: 'Playa', value: 'beach' },
    { name: 'Exposición larga', value: 'verylong' },
    { name: 'Fuegos artificiales', value: 'fireworks' }
];

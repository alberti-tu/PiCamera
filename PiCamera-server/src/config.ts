export const configuration = {
    mariaDB: {
        database: 'PiCamera',
        user: 'root',
        password: null,
        host: 'localhost',
        port: 3306
    },
    photo: {
        directory: 'camera/photo',
        rotate: true,
    },
    server: {
        port: 80,
        eventInterval: 2000,
        secret: 'secret',                                           // Key to encrypt authentication tokens
        timeout: '1d'                                               // Expiration time of the authentication token
    },
    video: {
        directory: 'camera/video',
        rotate: true,
    }
};

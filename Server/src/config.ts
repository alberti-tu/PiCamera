import { DatabaseOptions } from "./services/database.services";
import { ServerOptions } from "./models/http.models";

interface Configuration {
    database: DatabaseOptions,
    server: ServerOptions
}

export const configuration: Configuration = {
    database: {
        database: 'PiCamera',
        user: 'root',
        password: null,
        host: 'localhost',
        port: 3306
    },
    server: {
        port: 8080,
        secret: 'secret',       // Key to encrypt authentication tokens
        timeout: '1d'           // Expiration time of the authentication token
    }
}
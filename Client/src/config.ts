interface Configuration {
    host: string;                       // Base URL to host camera's hub
    port: number;                       // TCP/UDP server port
    production: boolean;                // Different enviroment configuration
    protocol: 'http' | 'https';         // http or https connection
    sharedKey: string;                  // Password to accept camera registration
}

export const configuration: Configuration = {
    host: 'localhost',
    port: 8080,
    production: true,
    protocol: 'http',
    sharedKey: 'mycamera',
}
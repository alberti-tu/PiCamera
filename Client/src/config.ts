interface Configuration {
    host: string;
    port: number;
    protocol: 'http' | 'https';
    sharedKey: string;
}

export const configuration: Configuration = {
    host: 'localhost',                  // Base URL to host camera's hub
    port: 8080,                         // TCP/UDP server port
    protocol: 'http',                   // http or https connection
    sharedKey: 'mycamera',              // Password to accept camera registration
}
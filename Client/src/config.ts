interface Configuration {
    host: string;
    sharedKey: string;
}

export const configuration: Configuration = {
    host: 'http://localhost:8080',      // Base URL to host camera's hub
    sharedKey: 'mycamera',              // Password to accept camera registration
}
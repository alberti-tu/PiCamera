interface Configuration {
	host: string;                       // Base URL to host camera's hub
	port?: number;                      // TCP server port, if null get the protocol by default
	production: boolean;                // Different enviroment configuration
	protocol: 'http' | 'https';         // http or https connection
	sharedKey: string;                  // Password to accept camera registration
}

export const configuration: Configuration = {
	host: 'localhost',
	port: null,
	production: true,
	protocol: 'http',
	sharedKey: 'mycamera',
}
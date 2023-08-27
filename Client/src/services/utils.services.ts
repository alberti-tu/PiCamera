import os from 'os';

export function getPortNumber(protocol: 'http' | 'https', port?: number): number {
	if (port == null || isNaN(port)) {
		return protocol == 'http' ? 80 : 443;
	} else {
		return port;
	}
}

export function getSerialNumber(): string {
	const mac = Object.values(os.networkInterfaces())
		.filter(item => !item[0]?.internal)
		.map(item => item[0]?.mac)
		[0]?.replace(/:/g, '');

	return mac?.substring(6, 12) || '';
}

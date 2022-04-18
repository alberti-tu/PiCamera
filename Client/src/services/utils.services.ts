import os, { NetworkInterfaceInfo } from 'os';

export function getPortNumber(protocol: 'http' | 'https', port?: number): number {
	if (port == null || isNaN(port)) {
		return protocol == 'http' ? 80 : 443;
	} else {
		return port;
	}
}

export function getSerialNumber(): string {
	const mac: string[] = getArray<NetworkInterfaceInfo[]>(os.networkInterfaces())
		.filter(item => !item[0].internal)
		.map<string>(item => item[0].mac);
	return mac.length != 0 ? mac[0].replace(/:/g, '').substring(6, 12) : '';
}

function getArray<T>(object: any): T[] {
	const result: T[] = [];

	object = Object(object);
	Object.keys(object).forEach(key => result.push(object[key]));

	return result;
}

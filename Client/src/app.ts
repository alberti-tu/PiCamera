import os, { NetworkInterfaceInfo } from 'os';
import crypto from 'crypto';
import axios from 'axios';
import { configuration } from './config';

function getMac<T>(object: any): T[] {
    const result: T[] = [];

    object = Object(object);
    Object.keys(object).forEach(key => result.push(object[key]));

    return result;
}

function getSerialNumber(): string | null {
    const mac: string[] = getMac<NetworkInterfaceInfo[]>(os.networkInterfaces())
        .filter(item => !item[0].internal)
        .map<string>(item => item[0].mac);

    return mac.length != 0 ? mac[0].replace(/:/g, '').substring(6, 12) : null;
}

console.log('camera-' + getSerialNumber());

const psk = crypto.createHash('sha256').update(configuration.sharedKey).digest('hex');

axios.get(configuration.host + '/camera/setup', { headers: { key: psk } })
    .then(result => console.log(result.data))
    .catch(err => console.log('No connection'));
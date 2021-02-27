import { spawn } from 'child_process';
import { configuration } from '../config';
import { CameraDTO } from '../models/http.models';
import { ServiceUDP } from './udp.services';
import { getSerialNumber } from './utils.services';

const argsDefault: string[] = [ '-w', '640', '-h', '480', '-fps', '25', '-n',  '-t', '0', '-o', '-' ];
const udp = new ServiceUDP();
const id = getSerialNumber();

export function stream(options: CameraDTO): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const child = spawn('raspivid', setCameraOptions(options));

        child.stdout.on('data', (data: string) => {
            udp.send(configuration.host, configuration.port, JSON.stringify({ id: id, payload: data }));
        });

        child.stdout.on('error', () => {
            reject(null);
        });

        child.stdout.on('close', () => {
            resolve(null);
        });
    });
}

function setCameraOptions(options: CameraDTO): string[] {
    if (!options) {
        return argsDefault;
    }

    let args = [];

    if (options.filter) {
        args = args.concat(['-ex', options.filter.toString()]);
    }

    if (options.quality) {
        args = args.concat(['-q', options.quality.toString()]);
    }

    if (options.rotation) {
        args = args.concat(['-rot', options.rotation.toString()]);
    }

    // return args.concat(argsDefault);
    return argsDefault;
}

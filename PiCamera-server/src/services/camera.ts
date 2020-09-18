import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { Observable } from 'rxjs';
import { StillCamera, StreamCamera, Flip, Codec } from "pi-camera-connect";
import { configuration } from '../config';
import moment from 'moment';
import path from 'path';
import fs from 'fs';

export class Camera {

    private loop: NodeJS.Timeout;
    private isAvailable: boolean;

    constructor() {
        this.isAvailable = true;
    }

    public streamStart(): Observable<string> {
        return new Observable<string>(observer => {
            this.loop = setInterval(() => {
                if (this.isAvailable) {
                    this.isAvailable = false;
                    this.takePicture()
                        .then(data => observer.next('data:image/jpeg;base64,' + data))
                        .catch(err => console.error(err))
                        .finally(() => this.isAvailable = true);
                }
            }, 1);
        });
    }

    public streamStop(): void {
        this.isAvailable = true;
        clearInterval(this.loop);
    }

    public takePicture(): Promise<string> {
        return new Promise((resolve, reject) => {
            const child = spawn('raspistill', ['-vf', '-hf', '-w', '640', '-h', '480', '-q', '75', '-o', '-']);

            const raw = [];

            child.stdout.on('data', (data: string) => raw.push(data));
            child.stdout.on('close', (code: number) => resolve(Buffer.concat(raw).toString('base64')));
            child.stdout.on('error', (err: any) => reject(err));
        });
    }
}






































export async function takePhoto(options?: { save?: boolean }): Promise<string> {
    const camera = new StillCamera({ flip: configuration.photo.rotate ? Flip.Both : Flip.None });
    const image = await camera.takeImage().catch(err => err);

    if (!Buffer.isBuffer(image)) {
        return null;
    }

    if (options && options.save) {
        fs.writeFileSync(configuration.photo.directory + '/' + await getName(configuration.photo.directory) + '.jpeg', image);
    }

    return 'data:image/jpeg;base64,' + image.toString('base64');
}

export async function takeVideo(): Promise<any> {
    const camera = new StreamCamera({ codec: Codec.H264, flip: configuration.video.rotate ? Flip.Both : Flip.None });
     
    const file = fs.createWriteStream(configuration.video.directory + '/' + await getName(configuration.photo.directory) + '.h264');
    const stream = camera.createStream();
    stream.pipe(file);
     
    camera.startCapture().then(() => {
        setTimeout(() => camera.stopCapture(), 5000);
    });
}


async function readDirectory(directory: string): Promise<string[]> {
    return new Promise<string[]>(resolve => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                fs.mkdir(path.resolve(directory), { recursive: true }, (err, res) => resolve([]))
            } else {
                resolve(files);
            }
        });
    });
}

async function getName(directory: string): Promise<string> {
    let num = 0;
    
    const date = moment().format('YYYY-MM-DD');
    const files = await readDirectory(directory);
    
    files.forEach(item => {
        if (date === item.split('_')[0]) {
            num = Math.max(num, parseInt(item.split('_')[1].split('.')[0]));
        }
    });

    return date + '_' + (num + 1);
}

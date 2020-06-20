import { StillCamera, StreamCamera, Codec } from "pi-camera-connect";
import { configuration } from '../config';
import path from 'path';
import fs from 'fs';
  

export async function takePhoto(save?: boolean): Promise<Buffer> {
    const camera = new StillCamera();
    const image = await camera.takeImage();

    if (save) {
        const timestamp = new Date();
        const date = timestamp.getFullYear() + '-' + (timestamp.getMonth() + 1) + '-' + timestamp.getDate();
        const num = (await readDirectory(configuration.media.directory)).filter(item => date === item.split('_')[0]).length + 1;
        fs.writeFileSync(configuration.media.directory + '/' + name + '_' + num + '.jpeg', image);
    }

    return image;
}

export async function takeVideo(): Promise<any> {
    const camera = new StreamCamera({ codec: Codec.H264 });
     
    const file = fs.createWriteStream('public/video.h264');
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
                fs.mkdir(path.resolve(directory), { recursive: true }, err => err ? console.log() : null); 
            }

            resolve(files ? files : []);
        });
    });
}

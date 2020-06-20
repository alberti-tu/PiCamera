import { StillCamera, StreamCamera, Flip, Codec } from "pi-camera-connect";
import { configuration } from '../config';
import path from 'path';
import fs from 'fs';
  

export async function takePhoto(options?: { save?: boolean, rotate?: boolean }): Promise<string> {
    const camera = new StillCamera({ flip: options.rotate ? Flip.Both : Flip.None });
    const image = await camera.takeImage();

    if (options.save) {
        const date = new Date();
        const name = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const num = (await readDirectory(configuration.media.directory)).filter(item => name === item.split('_')[0]).length + 1;
        fs.writeFileSync(configuration.media.directory + '/' + name + '_' + num + '.jpeg', image);
    }

    return 'data:image/jpeg;base64,' + image.toString('base64');
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

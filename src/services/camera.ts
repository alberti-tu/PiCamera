import { StillCamera, StreamCamera, Flip, Codec } from "pi-camera-connect";
import { configuration } from '../config';
import path from 'path';
import fs from 'fs';
  

export async function takePhoto(options?: { save?: boolean }): Promise<string> {
    const camera = new StillCamera({ flip: configuration.photo.rotate ? Flip.Both : Flip.None });
    const image = await camera.takeImage();

    if (options && options.save) {
        const date = new Date();
        const name = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const num = (await readDirectory(configuration.photo.directory)).filter(item => name === item.split('_')[0]).length + 1;
        fs.writeFileSync(configuration.photo.directory + '/' + name + '_' + num + '.jpeg', image);
    }

    return 'data:image/jpeg;base64,' + image.toString('base64');
}

export async function takeVideo(): Promise<any> {
    const camera = new StreamCamera({ codec: Codec.H264, flip: configuration.video.rotate ? Flip.Both : Flip.None });
     
    const file = fs.createWriteStream(configuration.video.directory + '/video.h264');
    const stream = camera.createStream();
    stream.pipe(file);
     
    camera.startCapture().then(() => {
        setTimeout(() => camera.stopCapture(), 5000);
    });
}


export async function readDirectory(directory: string): Promise<string[]> {
    return new Promise<string[]>(resolve => {
        fs.readdir(directory, (err, files) => {
            if (err) {
                fs.mkdir(path.resolve(directory), { recursive: true }, err => err ? console.log() : null); 
            }

            resolve(files ? files : []);
        });
    });
}

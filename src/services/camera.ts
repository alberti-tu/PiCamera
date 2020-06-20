import { StillCamera, StreamCamera, Codec } from "pi-camera-connect";
import fs from 'fs';

export async function takePhoto(): Promise<Buffer> {
    const camera = new StillCamera();
    return await camera.takeImage();
}

export async function takeVideo(): Promise<any> {
    const camera = new StreamCamera({ codec: Codec.H264 });
     
    const file = fs.createWriteStream('video-stream.h264');
    const stream = camera.createStream();
    stream.pipe(file);
     
    camera.startCapture().then(() => {
        setTimeout(() => camera.stopCapture(), 5000);
    });
}

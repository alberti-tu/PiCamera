import { StillCamera } from "pi-camera-connect";
import path from 'path';
import fs from 'fs';


export async function takePhoto() {
    const camera = new StillCamera();
    const image = await camera.takeImage();
    fs.writeFileSync('public/image.jpeg', image)
}

export async function takevideo() {}


/*
import PiCamera from 'pi-camera';
import path from 'path';

interface cameraConfig {
    mode: 'photo' | 'video';
    output?: string;
    width?: number;
    height?: number;
    quality?: number;
    latest?: string;
    timeout?: number;
    thumb?: string;
    demo?: number;
    encoding?: string;
    timelapse?: number;
    framerate?: number;
    rotation?: number;
    preview?: string;
    opacity?: number;
    annotate?: string | number;
    exif?: string;
    raw?: boolean;
    verbose?: boolean;
    fullscreen?: boolean;
    nopreview?: boolean;
    vstab?: boolean;
    hflip?: boolean;
    vflip?: boolean;
    timestamp?: boolean;
    datetime?: boolean;
}

export async function takePhoto() {
    const options: cameraConfig = { mode: 'photo', output: path.resolve('public/photo.jpeg'), width: 640, height: 480, nopreview: true };
    const camera = new PiCamera(options);
    camera.snap()
        .then(data => console.log(data))
        .catch(e => console.log(e))
}

export async function takevideo() {
    const options: cameraConfig = { mode: 'video', output: path.resolve('public/video.h264'), width: 1920, height: 1080, timeout: 5000, nopreview: true };
    const camera = new PiCamera(options);
    camera.record()
        .then(data => console.log(data))
        .catch(e => console.log(e))
}
*/
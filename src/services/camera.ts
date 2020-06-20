import PiCamera from 'pi-camera';
import path from 'path';
import { configuration } from '../config';

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
    const options: cameraConfig = { ...configuration.photo, mode: 'photo', output: path.resolve(configuration.photo.output) };
    const camera = new PiCamera(options);
    camera.snap().then(data => console.log(data));
}

export async function takevideo() {
    const options: cameraConfig = { ...configuration.photo, mode: 'video', output: path.resolve(configuration.video.output) };
    const camera = new PiCamera(options);
    camera.record().then(data => console.log(data));
}
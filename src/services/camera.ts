import { StillCamera } from "pi-camera-connect";
import fs from 'fs';

export async function takePhoto(): Promise<Buffer> {
    const camera = new StillCamera();
    const image = await camera.takeImage();
    fs.writeFileSync('public/image.jpeg', image)
    return image;
}

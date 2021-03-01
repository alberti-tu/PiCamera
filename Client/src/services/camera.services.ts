import { spawn } from 'child_process';
import { configuration } from '../config';
import { PictureOptions } from '../models/http.models';

const argsDefault: string[] = ['-w', '640', '-h', '480', '-t', '800', '-n', '-o', '-'];

export class Camera {

    private static instance: Camera = null;
    private _pictureOptions: PictureOptions;
    private _isAvailable: boolean = true;

    protected constructor(options: PictureOptions) {
        this._pictureOptions = options;
    }

    public static getInstance(configuration: PictureOptions): Camera {
        if (!Camera.instance) {
            Camera.instance = new Camera(configuration);
        }
        return Camera.instance;
    }

    public isAvailable(): boolean {
        return this._isAvailable;
    }

    public takePicture(): Promise<string> {
        this._isAvailable = false;
        if (configuration.production) {
            return new Promise((resolve, reject) => {
                const child = spawn('raspistill', argsDefault);
    
                const raw = [];
    
                child.stdout.on('data', (data: string) => {
                    raw.push(data);
                });

                child.stdout.on('error', (err: any) => {
                    reject(err);
                });

                child.stdout.on('close', () => {
                    this._isAvailable = true;
                    resolve(Buffer.concat(raw).toString('base64'));
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this._isAvailable = true;
                    resolve(null);
                }, 1000);
            });
        }
    }
}
        
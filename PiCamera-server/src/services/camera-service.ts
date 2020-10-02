import { CameraOptions, PictureOptions } from '../models/options.model';
import { File } from './file-service';
import { spawn } from 'child_process';
import { Observable } from 'rxjs';

const argsDefault: string[] = ['-w', '1920', '-h', '1080', '-t', '800', '-n', '-o', '-'];

export class Camera {

    private static instance: Camera = null;
    private cameraOptions: CameraOptions;
    private pictureOptions: PictureOptions;

    private args: string[];
    private loop: NodeJS.Timeout;
    private isAvailable: boolean;
    private save: boolean;

    protected constructor(options: CameraOptions) {
        this.cameraOptions = {
            directory: options.directory != null ? options.directory : 'camera'
        };

        this.pictureOptions = {
            quality: options.quality != null ? options.quality: 100,
            rotation: options.rotation != null ? options.rotation : 0
        };
        
        this.setPictureOptions(this.pictureOptions);
        this.isAvailable = true;
    }

    public static getInstance(configuration: CameraOptions): Camera {
        if (!Camera.instance) {
            Camera.instance = new Camera(configuration);
        }
        return Camera.instance;
    }

    public streamStart(): Observable<string> {
        return new Observable<string>(observer => {
            this.loop = setInterval(() => {
                if (this.isAvailable) {
                    this.isAvailable = false;
                    const saveState: boolean = this.save;

                    this.takePicture(this.save)
                        .then(data => observer.next('data:image/jpeg;base64,' + data))
                        .catch(err => console.error(err))
                        .finally(() => {
                            if (saveState) {
                                this.save = false;
                            }

                            this.isAvailable = true
                        });
                }
            }, 1);
        });
    }

    public streamStop(): void {
        this.isAvailable = true;
        clearInterval(this.loop);
    }

    public takePicture(save?: boolean): Promise<string> {
        return new Promise((resolve, reject) => {
            const child = spawn('raspistill', this.args);

            const raw = [];

            child.stdout.on('data', (data: string) => raw.push(data));
            child.stdout.on('error', (err: any) => reject(err));

            child.stdout.on('close', (code: number) => {
                const image = Buffer.concat(raw).toString('base64');

                if (save) {
                    File.writeFile(this.cameraOptions.directory, image, 'jpg');
                }

                resolve(image);
            });
        });
    }

    public setPictureOptions(options: PictureOptions): void {
        if (!options) {
            return;
        }

        this.args = [];

        if (options.quality) {
            this.args = this.args.concat(['-q', options.quality.toString()]);
        }

        if (options.rotation) {
            this.args = this.args.concat(['-rot', options.rotation.toString()]);
        }

        this.pictureOptions = options;
        this.args = this.args.concat(argsDefault);
    }
   
    public getPictureOptions(): PictureOptions {
        return this.pictureOptions;
    }

    public getCameraOptions(): CameraOptions {
        return this.cameraOptions;
    }

    public savePicture(): void {
        this.save = true;
    }

}

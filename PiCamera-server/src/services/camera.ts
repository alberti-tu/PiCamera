import { CameraOptions, PictureOptions } from '../models/options.model';
import { spawn } from 'child_process';
import { Observable } from 'rxjs';
import moment from 'moment';
import path from 'path';
import fs from 'fs';

const argsDefault: string[] = ['-w', '640', '-h', '480', '-t', '800', '-n', '-o', '-'];

export class Camera {

    private static instance: Camera = null;

    private args: string[];

    private cameraOptions: CameraOptions;
    private pictureOptions: PictureOptions;
    
    private isAvailable: boolean;
    private loop: NodeJS.Timeout;
    private save: boolean;

    protected constructor(options: CameraOptions) {
        this.cameraOptions = {
            directory: options.directory != null ? options.directory : 'camera'
        };

        this.pictureOptions = {
            quality: options.quality != null ? options.quality: '100',
            rotation: options.rotation != null ? options.rotation : '0'
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
                if (this.isAvailable && !this.save) {
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

    public savePicture(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.save = true;
            
            while (this.save) {
                if (this.isAvailable) {
                    this.isAvailable = false;

                    this.takePicture(true)
                        .then(data => resolve('data:image/jpeg;base64,' + data))
                        .catch(err => reject(err))
                        .finally(() => {
                            this.save = false;
                            this.isAvailable = true;
                        });
                }
            }
        });
    }

    public getPictureOptions(): PictureOptions {
        return this.pictureOptions;
    }

    public setPictureOptions(options: PictureOptions) {
        if (!options) {
            return;
        }

        this.args = [];

        options.rotation = options.rotation || this.cameraOptions.rotation;
        this.args = this.args.concat([ '-rot', options.rotation ])

        options.quality = options.quality || this.cameraOptions.quality;
        this.args = this.args.concat([ '-q', options.quality.toString() ])

        this.pictureOptions = options;
        this.args = this.args.concat(argsDefault);
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
                    this.getName(this.cameraOptions.directory).then(name => {
                        fs.writeFileSync(this.cameraOptions.directory + '/' + name + '.jpeg', image);
                    });
                }

                resolve(image);
            });
        });
    }

    private async readDirectory(directory: string): Promise<string[]> {
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

    private async getName(directory: string): Promise<string> {
        let num = 0;
        
        const date = moment().format('YYYY-MM-DD');
        const files = await this.readDirectory(directory);
        
        files.forEach(item => {
            if (date === item.split('_')[0]) {
                num = Math.max(num, parseInt(item.split('_')[1].split('.')[0]));
            }
        });

        return date + '_' + (num + 1);
    }
}

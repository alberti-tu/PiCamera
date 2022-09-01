import { spawn } from 'child_process';
import { configuration } from '../config';
import { CameraOptions } from '../models/http.models';

const argsDefault: string[] = ['-w', '1280', '-h', '720', '-t', '800', '-n', '-o', '-'];

export class Camera {

	private static instance: Camera = null;
	private isCurrentAvailable: boolean = true;
	private args: string[] = [];

	protected constructor() { }

	public static getInstance(): Camera {
		if (!Camera.instance) {
			Camera.instance = new Camera();
		}
		return Camera.instance;
	}

	public isAvailable(): boolean {
		return this.isCurrentAvailable;
	}

	public takePicture(): Promise<string> {
		this.isCurrentAvailable = false;
		if (configuration.production) {
			return new Promise((resolve, reject) => {
				const child = spawn('raspistill', this.args);

				const raw = [];

				child.stdout.on('data', (data: string) => raw.push(data));
				child.stdout.on('error', (err: any) => reject(err));
				child.stdout.on('close', () => {
					this.isCurrentAvailable = true;
					resolve(Buffer.concat(raw).toString('base64'));
				});
			});
		} else {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					this.isCurrentAvailable = true;
					resolve(null);
				}, 1000);
			});
		}
	}

	public setPictureOptions(options: CameraOptions): void {
		if (!options) {
			return;
		}

		this.args = [];

		if (options.filter) {
			this.args = this.args.concat(['-ex', options.filter.toString()]);
		}

		if (options.quality) {
			this.args = this.args.concat(['-q', options.quality.toString()]);
		}

		if (options.rotation) {
			this.args = this.args.concat(['-rot', options.rotation.toString()]);
		}

		this.args = this.args.concat(argsDefault);
	}
}

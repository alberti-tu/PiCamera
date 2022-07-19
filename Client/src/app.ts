import { State, StateMachine } from "./services/state-machine.services";
import { CameraDTO } from "./models/http.models";
import { Camera } from "./services/camera.services";
import { configuration } from "./config";

import * as http from "./services/http.services";

function stream(options?: CameraDTO): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		camera.setPictureOptions(options);

		if (camera.isAvailable()) {
			camera.takePicture()
				.then(async data => {
					const getSettings = await http.sendPicture(options.timestamp, data != null ? data : null);
					getSettings ? reject() : resolve();
				})
				.catch(() => reject());
		}
	});
}

const camera = Camera.getInstance();

const states: State[] = [
	{ name: 'setup', resolve: 'camera', rejected: 'register', action: (data) => http.setup() },
	{ name: 'register', resolve: 'setup', rejected: undefined, action: (data) => http.register() },
	{ name: 'camera', resolve: 'camera', rejected: 'setup', action: (data) => stream(data), input: 'setup' }
];

console.log('Camera Id: ' + http.id);
console.log('Camera hub: ' + http.url + '\n');

const stateMachine = new StateMachine(states);
stateMachine.logs = !configuration.production;
stateMachine.run();

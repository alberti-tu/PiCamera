import { State, StateMachine } from "./services/state-machine.services";
import { getSerialNumber } from "./services/utils.services";
import { PictureOptions } from "./models/http.models";
import { Camera } from "./services/camera.services";
import * as http from "./services/http.services";
import { configuration } from "./config";

function stream(options?: PictureOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        camera.setPictureOptions(options);

        if (camera.isAvailable()) {
            camera.takePicture()
                .then(async data => {
                    const getSettings = await http.sendPicture(data != null ? data : null);
                    getSettings ? reject(null) : resolve(null);
                })
                .catch(() => reject(null));
        }
    });
}

const camera = Camera.getInstance();

const states: State[] = [
    { name: 'setup', transition1: 'camera', transition2: 'register', action: (data) => http.setup() },
    { name: 'register', transition1: 'setup', transition2: null, action: (data) => http.register() },
    { name: 'camera', transition1: 'camera', transition2: 'setup', action: (data) => stream(data), input: 'setup' }
];

console.log('Camera Id: ' + getSerialNumber());
console.log('Camera hub: ' + configuration.protocol + '://' + configuration.host + ':' + configuration.port + '\n');

const stateMachine = new StateMachine(states);
stateMachine.logs = !configuration.production;
stateMachine.run();

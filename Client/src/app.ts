import { State, StateMachine } from "./services/utils.services";
import { PictureOptions } from "./models/http.models";
import { Camera } from "./services/camera.services";
import * as http from "./services/http.services";

function stream(options?: PictureOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        camera.setPictureOptions(options);

        if (camera.isAvailable()) {
            camera.takePicture()
                .then(async data => {
                    const getSettings = await http.sendPicture(data != null ? 'data:image/jpg;base64,' + data : null);
                    getSettings ? reject(null) : resolve(null);
                })
                .catch(() => {
                    reject(null);
                })
        }
    });
}

const camera = Camera.getInstance();

const states: State[] = [
    {
        name: 'setup',
        transition1: 'camera',
        transition2: 'register',
        action: () => http.setup()
    },
    {
        name: 'register',
        transition1: 'setup',
        transition2: null,
        action: () => http.register()
    },
    { 
        name: 'camera',
        transition1: 'camera',
        transition2: 'setup',
        action: (data) => stream(data),
        input: 'setup'
    }
];

const stateMachine = new StateMachine(states);
stateMachine.run();

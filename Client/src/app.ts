import { register, setup } from "./services/http.services";
import { State, stateMachine } from "./services/utils.services";
import { stream } from "./states/stream.state";

const states: State[] = [
    { name: 'setup', resolve: 'camera', reject: 'register', action: () => setup(), result: null },
    { name: 'register', resolve: 'setup', reject: null, action: () => register(), result: null },
    { name: 'camera', resolve: 'camera', reject: 'setup', action: () => stream(), result: null }
];

stateMachine(states);

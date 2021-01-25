import { register, setup } from "./services/http.services";
import { stream } from "./services/stream";
import { State, stateMachine } from "./services/utils.services";

const states: State[] = [
    { name: 'setup', resolve: 'stream', reject: 'register', action: () => setup(), result: null },
    { name: 'register', resolve: 'setup', reject: null, action: () => register(), result: null },
    { name: 'stream', resolve: 'setup', reject: null, action: () => stream(), result: null },
];

stateMachine(states);

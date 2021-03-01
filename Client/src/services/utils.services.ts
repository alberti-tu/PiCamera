import os, { NetworkInterfaceInfo } from 'os';

export interface State {
    name: string;
    transition1: string;
    transition2: string;
    action: (data?: any) => Promise<any>;
    input?: string;
    output?: any;
}

export class StateMachine {

    private _states: State[] = [];

    constructor(states: State[]) {
        this._states = states;
    }

    public async run(start?: string): Promise<void> {
        let currentState: string = start || this._states[0].name;

        while (true) {
            const state: State = this._states.find(item => item.name == currentState);

            if (state == undefined) {
                console.log('[' + new Date().toLocaleString() + '] --> exit');
                break;
            }

            console.log('[' + new Date().toLocaleString() + '] --> ' + currentState);

            try {
                const input = this.selectState(state.input);
                state.output = await state.action(input);
                currentState = state.transition1;
            } catch {
                state.output = null;
                currentState = state.transition2;
            }
        }
    }

    public selectState(name: string): any {
        const state: State = this._states.find(item => item.name == name);
        return state != null ? state.output : null;
    }
}

export function getSerialNumber(): string {
    const mac: string[] = getArray<NetworkInterfaceInfo[]>(os.networkInterfaces())
        .filter(item => !item[0].internal)
        .map<string>(item => item[0].mac);
    return mac.length != 0 ? mac[0].replace(/:/g, '').substring(6, 12) : '';
}

function getArray<T>(object: any): T[] {
    const result: T[] = [];

    object = Object(object);
    Object.keys(object).forEach(key => result.push(object[key]));

    return result;
}

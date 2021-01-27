import os, { NetworkInterfaceInfo } from 'os';

export interface State {
    name: string;
    resolve: string;
    reject: string;
    action: () => Promise<any>;
    result: any
}

export async function stateMachine(states: State[], start?: string): Promise<void> {
    let current = start || states[0].name;

    while (true) {
        const index = states.findIndex(item => item.name == current);

        if (index < 0) {
            process.exit(0);
        }

        try {
            console.log('[' + new Date().toLocaleString() + '] --> ' + current);
            states[index].result = await states[index].action();
            current = states[index].resolve;
        } catch {
            states[index].result = null;
            current = states[index].reject;
        }
        
        if (current == null) {
            process.exit(0);
        }
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

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

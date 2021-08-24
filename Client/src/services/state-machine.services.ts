export interface State {
	name: string;
	transition1: string;
	transition2: string;
	action: (data?: any) => Promise<any>;
	input?: string;
	output?: any;
}

export class StateMachine {

	public logs: boolean = false;
	private _states: State[] = [];

	constructor(states: State[]) {
		this._states = states;
	}

	public async run(start?: string): Promise<void> {
		let currentState: string = start || this._states[0].name;

		while (true) {
			const state: State = this._states.find(item => item.name == currentState);

			if (state == undefined) {
				this._print('exit');
				break;
			}

			this._print(currentState);

			try {
				const input = this.selectInputState(state.input);
				state.output = await state.action(input);
				currentState = state.transition1;
			} catch {
				state.output = null;
				currentState = state.transition2;
			}
		}
	}

	public selectInputState(name: string): any {
		const state: State = this._states.find(item => item.name == name);
		return state != null ? state.output : null;
	}

	private _print(name: string) {
		if (this.logs == true) {
			console.log('[' + new Date().toLocaleString() + '] --> ' + name);
		}
	}
}

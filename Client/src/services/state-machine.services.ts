export interface State {
	name: string;
	resolve: string;
	rejected: string;
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
				this._print('exit', true);
				break;
			}

			this._print(currentState);

			try {
				const data = this.selectInputState(state?.input);
				state.output = await state.action(data);
				currentState = state.resolve;
			} catch {
				state.output = undefined;
				currentState = state.rejected;
			}
		}
	}

	public selectInputState(name: string): any {
		return this._states.find(item => item.name == name)?.output;
	}

	private _print(message: string, isError?: boolean) {
		if (this.logs || isError) {
			console.log('[' + new Date().toLocaleString() + '] --> ' + message);
		}
	}
}

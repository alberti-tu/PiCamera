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
	private states: State[];

	constructor(states: State[] = []) {
		this.states = states;
	}

	public async run(start?: string): Promise<void> {
		let currentState: string = start || this.states[0].name;

		while (true) {
			const state: State = this.states.find(item => item.name == currentState);

			if (!state) {
				this.print('exit', true);
				break;
			}

			this.print(currentState);

			try {
				const data = this.states.find(item => item.name == state?.input)?.output;
				state.output = await state.action(data);
				currentState = state.resolve;
			} catch {
				state.output = undefined;
				currentState = state.rejected;
			}
		}
	}

	private print(message: string, isError?: boolean) {
		if (this.logs || isError) {
			console.log('[' + new Date().toLocaleString() + '] --> ' + message);
		}
	}
}

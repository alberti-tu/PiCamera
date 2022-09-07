export interface IButton {
	name?: string,
	type?: 'primary' | 'secondary' | 'default'
	value?: string,
}

export interface IDialogResult<T> {
	button?: IButton,
	data?: T
}
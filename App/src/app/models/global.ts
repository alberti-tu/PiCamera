export interface IButton {
	name?: string;
	type?: 'primary' | 'secondary' | 'default'
	value?: string;
}

export interface IDialogData {
	title?: string;
	message?: string;
	buttons?: IButton[]
}

export interface IDialogResult<T> {
	button?: IButton;
	data?: T;
}

export interface IUser {
	username?: string;
	password?: string;
}
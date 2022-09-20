import { IFormField } from "../components/form/form.component";

export interface IButton {
	name?: string;
	type?: 'primary' | 'secondary' | 'default'
	value?: string;
}

export interface IDialogData {
	title?: string;
	message?: string;
	form?: IFormField[];
	buttons?: IButton[]
}

export interface IDialogResult<T> {
	button?: IButton;
	data?: T;
}

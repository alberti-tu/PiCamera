import { IFormField } from "../components/form/form.component";

export interface IButton {
	name?: string;
	type?: 'primary' | 'secondary' | 'default'
	value?: string;
}

export interface IKeyValue {
	key: string;
	value?: string;
}

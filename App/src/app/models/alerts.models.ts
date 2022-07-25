import { ToastState } from "../components/toast/toast.component";

export interface Dialog {
	id?: number;
	header?: string;
	message?: string;
	buttons?: DialogButtons[];
	settings?: DialogSettings;
}

export interface DialogButtons {
	isPrimary?: boolean;
	text?: string;
	value?: string
}

export interface DialogSettings {
	show?: boolean;
}

export interface Toast {
	id?: number;
	message?: string;
	settings?: ToastSettings;
}

export interface ToastSettings {
	delay?: number;
	show?: boolean;
	state?: ToastState;
}
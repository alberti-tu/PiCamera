import { ToastState } from "../components/toast/toast.component";

export interface Dialog {
	id?: number;
	header?: string;
	message?: string;
	buttons?: DialogButton[];
	settings?: DialogSettings;
}

export interface DialogButton {
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
import { ToastState } from "../components/toast/toast.component";

export interface Toast {
	id?: number;
	header?: string;
	message?: string;
	settings?: ToastSettings;
}

export interface ToastSettings {
	delay?: number;
	show?: boolean;
	state?: ToastState;
}
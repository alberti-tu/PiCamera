import { ToastState } from "../components/toast/toast.component";

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
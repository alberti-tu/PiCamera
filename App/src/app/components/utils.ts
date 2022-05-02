import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {
	static whiteSpace(control: AbstractControl) : ValidationErrors | null {
		return (control.value as string).indexOf(' ') >= 0 ? { whiteSpace: true } : null;
	}
}

export function getPath(path: string, params?: Record<string, string | number | boolean>): string {
	if (params) {
		Object.keys(params).forEach(key => path = path.replace('[' + key + ']', params[key].toString()))
	}

	if (path[path.length -1] == '/') {
		path = path.slice(0, -1);
	}

	return path;
}
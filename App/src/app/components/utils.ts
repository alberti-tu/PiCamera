import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {
	static whiteSpace(control: AbstractControl) : ValidationErrors | null {
		return (control.value as string).indexOf(' ') >= 0 ? { whiteSpace: true } : null;
	}
}
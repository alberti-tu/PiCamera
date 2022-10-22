import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IKeyValue } from 'src/app/models/global';

export interface IFormButton {
	name?: string;
	type?: 'submit' | 'button'
	value?: string;
}

export interface IFormField {
	id: string;
	icon?: string;
	label?: string;
	max?: string;
	min?: string;
	params?: IKeyValue[];
	requisites?: any[];
	step?: string;
	type?: 'text' | 'password' | 'number' | 'range' | 'dropdown';
	value?: string;
}

export interface IFormResult {
	button?: IFormButton;
	form?: Record<string, string | number>;
}

@Component({
	selector: 'form-container',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@Output() public result = new EventEmitter<IFormResult>();

	@Input() public buttons?: IFormButton[];
	@Input() public fields?: IFormField[];

	public form: FormGroup;

	private showPassword: Record<string, boolean> = {};

	constructor(private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({});
	}
	
	public ngOnInit(): void {
		this.fields?.forEach(item => {
			this.form.addControl(item?.id, new FormControl('', item?.requisites));

			setTimeout(() => {
				this.fields?.forEach(item => {
					this.form.get(item.id)?.setValue(item?.value || '')
				});
			}, 100)
		});
	}

	public submit(button?: IFormButton): void {
		this.result.emit({ button, form: this.getForm()});
	}

	public getPasswordButton(item: IFormField): boolean {
		return this.showPassword[item.id];
	}

	public setPasswordButton(item: IFormField): void {
		this.showPassword[item.id] = !this.showPassword[item?.id];
	}

	public hasError(name: string | undefined, error: string): boolean {
		if (name == undefined) {
			return false;
		}

		const control = this.form.get(name);
		return control && control?.touched && control.errors && control.errors[error];
	}

	private getForm(): Record<string, string | number> | undefined {
		if (this.form.valid == false) {
			return undefined;
		}

		const result: Record<string, string | number> = {}

		Object.keys(this.form.value).map(key => {
			const type = this.fields?.find(item => item.id == key)?.type;

			switch (type) {
				case 'number':
				case 'range':
					result[key] = +this.form.value[key];
					break;
				default:
					result[key] = this.form.value[key];
			}
		});

		return result;
	} 
}

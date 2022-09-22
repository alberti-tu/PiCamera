import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface IFormField {
	id: string;
	label?: string;
	requisites?: any[];
	max?: string
	min?: string
	step?: string
	value?: string;
	icon?: string;
	type?: string;
}

@Component({
	selector: 'form-container',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@Output() public result = new EventEmitter<Record<string, string | number>>();
	@Input() public fields?: IFormField[];

	public form: FormGroup;
	private showPassword: Record<string, boolean> = {};

	constructor(private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({});
	}
	
	public ngOnInit(): void {
		this.form = this.formBuilder.group(this.initializeForm(this.fields));

		this.form.valueChanges.subscribe(result => this.submit(result));
		this.submit(this.form.value);
	}

	public submit(data: any): void {
		if (this.form.valid) {
			Object.keys(data).map(key => {
				const type = this.fields?.find(item => item.id == key)?.type;

				switch (type) {
					case 'number':
					case 'range':
						data[key] = +data[key];
						break;
				}
			});

			this.result.emit(data);
		} else {
			this.result.emit(undefined);
		}
	}

	public getPasswordButton(item: IFormField): boolean {
		return this.showPassword[item.id];
	}

	public setPasswordButton(item: IFormField): void {
		this.showPassword[item.id] = !this.showPassword[item.id];
	}

	public hasError(name: string | undefined, error: string): boolean {
		if (name == undefined) {
			return false;
		}

		const control = this.form.get(name);
		return control && control?.touched && control.errors && control.errors[error];
	}

	private initializeForm(fields?: IFormField[]): any {
		if (fields != undefined) {
			return fields?.reduce<any>((state, item) => ({ ...state, [item.id]: [ item.value || '', item.requisites ]}), {});
		} else {
			return {};
		}
	}
}

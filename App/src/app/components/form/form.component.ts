import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface IFormField {
	id?: string;
	label?: string;
	requisites?: any[];
	value?: string;
	icon?: string;
	type?: 'text' | 'password'
}

@Component({
	selector: 'form-container',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@Output() public result = new EventEmitter<Record<string, string>>();
	@Input() public fields?: IFormField[];

	public form: FormGroup;
	private showPassword: Record<string, boolean>;

	constructor(private formBuilder: FormBuilder) {
		this.form = this.formBuilder.group({});
		this.showPassword = {};
	}
	
	public ngOnInit(): void {
		const group = this.fields?.reduce<any>((state, item) => {
			if (item.id == undefined) {
				return state;
			}
			return { ...state, [item.id]: [ item.value || '', item.requisites ]}
		}, {});

		this.form = this.formBuilder.group(group);

		this.form.valueChanges.subscribe(result => this.submit(result));
		this.submit(this.form.value);
	}

	public submit(data: any): void {
		this.result.emit(this.form.valid ? data : undefined)
	}

	public getPasswordButton(item: IFormField): boolean {
		if (item?.id != undefined) {
			return this.showPassword[item.id];
		} else {
			return false;
		}
	}

	public setPasswordButton(item: IFormField): void {
		if (item?.id == undefined) {
			return;
		}

		this.showPassword[item.id] = !this.showPassword[item.id];
	}

	public hasError(name: string | undefined, error: string): boolean {
		if (name == undefined) {
			return false;
		}

		const control = this.form.get(name);
		return control && control?.touched && control.errors && control.errors[error];
	}
}

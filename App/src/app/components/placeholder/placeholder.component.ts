import { Component, Input } from '@angular/core';

@Component({
	selector: 'placeholder',
	templateUrl: './placeholder.component.html',
	styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent {

	@Input() public data: any[] = []
	@Input() public isLoading: boolean = false

	constructor() { }

}

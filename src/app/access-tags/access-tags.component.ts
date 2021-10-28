import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-access-tags',
	templateUrl: './access-tags.component.html',
	styleUrls: ['./access-tags.component.scss']
})
export class AccessTagsComponent implements OnInit {
	verified = false;
	age: number;
	name: string;
	job: string;
	person: string;

  

	constructor() {
		this.name = 'Aakash';
		this.age = 24;
		this.person = 'Male';
		this.job = 'UI Engineer';
	}

  
	ngOnInit(): void {
		this.sayHello('hey aakash');
	}

	sayHello(params: string): string {
		const name = params;
    var newName = name;
		return newName;
	}
}

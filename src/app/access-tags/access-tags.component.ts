import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-access-tags",
	templateUrl: "./access-tags.component.html",
	styleUrls: ["./access-tags.component.scss"]
})
export class AccessTagsComponent implements OnInit {
	verified = false;
	fall: any;
	name: any;

	constructor() {
		this.name = "Aakash";
	}
	ngOnInit(): void {
		this.fall = true;
	}

	sayHello() {
		const arg = "Shubham";
		return arg;
	}
}

import { Component, OnInit } from '@angular/core';
import { MatToolbarModule, MatSelectModule, MatFormFieldModule, MatButtonModule } from '@angular/material/';
import { HelperService } from './service/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Nesten Explorer';
	constructor(public helper: HelperService) { }

	ngOnInit() {		

	}
}


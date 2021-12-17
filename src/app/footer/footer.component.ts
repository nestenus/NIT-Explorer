import { Component, OnInit } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material/';

import { HelperService } from '../service/helper/helper.service';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

	constructor(public router: Router, public helper: HelperService, public auth: AuthService) { }
  
  ngOnInit() {

	}
	
}

import { Component, OnInit } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material/';

import { HelperService } from '../service/helper/helper.service';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

	constructor(public router: Router, public helper: HelperService, public auth: AuthService) { }
  
  ngOnInit() {

	}
	
}

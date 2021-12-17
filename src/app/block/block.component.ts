import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { HelperService } from '../service/helper/helper.service';
import { ApiService } from '../service/api/api.service'
import { log } from 'util';


@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})

export class BlockComponent implements OnInit, OnChanges {
  public block_number='';
  public blockDetails;

  public loading = true;
  public txObject;
  public JSON;
  public Out = true;
  public address;
  constructor(public api : ApiService, public dialog: MatDialog,public router: Router, public helper: HelperService,private route: ActivatedRoute) {
    this.JSON = JSON;
  }

  ngOnInit() {
      // this.address = this.helper.getAddress();
      this.block_number = this.route.snapshot.paramMap.get('id');
      this.goToBlockDetails(this.block_number);
      // this.helper.selAcc.subscribe(x=>{
      // })
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  // backToDashboard() {
  //   this.router.navigate(['dashboard'])
  // }

  goToBlockDetails(block_number){
    // call api to fetch block details
    this.api.fetch_block_details(block_number).subscribe(res => {
      console.log(res.json().data);
      this.blockDetails = res.json().data;
    })
    this.loading = false;
  }

}

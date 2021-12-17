import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { HelperService } from '../service/helper/helper.service';
import { ApiService } from '../service/api/api.service'
import { log } from 'util';


@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})

export class TxComponent implements OnInit, OnChanges {
  public tx_hash='';
  public txDetails;

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
      this.tx_hash = this.route.snapshot.paramMap.get('id');
      this.checkTxHash(this.tx_hash,(check)=>{
        if(check){
          // console.log
          this.goToTransactionDetails(this.tx_hash);
        }
        else{
          this.router.navigate(['/home']);
        }
      })
      this.goToTransactionDetails(this.tx_hash);
      // this.helper.selAcc.subscribe(x=>{
      // })
    }

  checkTxHash(txHash,cb) {
    if(/^0x[a-fA-F0-9]{64}$/.test(txHash)){ // call to address
     return cb(true)
    }
    else{
      return cb(false)
    }
  };

  ngOnChanges(changes: SimpleChanges) {

  }

  // backToDashboard() {
  //   this.router.navigate(['dashboard'])
  // }

  goToTransactionDetails(tx_hash){
    // call api to fetch tx details
    this.api.fetch_transaction_details(tx_hash).subscribe(res => {      
      console.log(res.json().tx);
      this.txDetails = res.json().tx;
    })
    this.loading = false;
  }

}

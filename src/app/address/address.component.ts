import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { HelperService } from '../service/helper/helper.service';
import { ApiService } from '../service/api/api.service'
import  Swal from "sweetalert2";
// import sha3 from '../../../node_modules/sha3'


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
  public txnHash='';
  public addressBalance = [];
  public addressTxs = [];
  public inAddressTxs = [];
  public outAddressTxs = [];
  public allTx = true;
  public inTx = false;
  public outTx = false;
  public loading = true;
  public pageNumberForTransaction;
  public txObject;
  public JSON;
  public Out = true;
  public address;
  TotalInTransactions: any;
  InPages: number;
  TotalInTransactionPages: number;
  pageNumberForInTransaction: any;
  TotalOutTransactions: any;
  OutPages: number;
  TotalOutTransactionPages: number;
  pageNumberForOutTransaction: any;
  InSearchPage: string;
  blockSearchPage: string;
  OutSearchPage: string;
  constructor(public api : ApiService, public dialog: MatDialog,public router: Router, public helper: HelperService,private route: ActivatedRoute) {
    this.JSON = JSON;
  }

  ngOnInit() {
      // this.address = this.helper.getAddress();
      this.txnHash = this.route.snapshot.paramMap.get('id');
      this.address = this.txnHash;
      this.checkAddress(this.txnHash,(check)=>{
        if(check){
          // console.log
          
          this.goToAddressDetails();
        }
        else{
          this.router.navigate(['/home']);
        }
      })
      // this.helper.selAcc.subscribe(x=>{
      // })
  }

  showInTx(){
    // this.api.getTxHistory(this.helper.accountList[this.helper.slectedAddress],0)
    
    this.inTx = true;
      this.allTx = false;
      this.outTx = false;
  }
  showOutTx(){
    // this.api.getTxHistory(this.helper.accountList[this.helper.slectedAddress],0)
    
    this.inTx = false;
      this.allTx = false;
      this.outTx = true;
  }

  /**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
checkAddress(address,cb) {
  if(/^0x[a-fA-F0-9]{40}$/.test(address)){ // call to address
   return cb(true)
  }
  else{
    return cb(false)
  }
};
 
  goToAddressDetails(){
    // call api to fetch address details
    let hash = this.address;
    this.api.fetch_address_details(hash).subscribe(res => {
      console.log(res.json());
      this.addressBalance = res.json().balance;
      this.addressTxs = res.json().txs;
      this.inTx = false;
      this.allTx = true;
      this.outTx = false;
    })
    
    this.fetchTransaction('intx',0,0);
    this.fetchTransaction('outtxs',0,0);
    this.loading = false;
  }

  fetchTransaction(kind, pageNumberForInTransaction, pageNumberForOutTransaction){
    // this.headElementsForTransactionList = ['Hash','From','To','Value','Timestamp'];

    // call to api to fetch transactions
    if(kind == 'intx'){
      this.api.getInTx(this.address,pageNumberForInTransaction).subscribe(res => {
        console.log('InTxs',res.json());
        this.inAddressTxs = res.json().data;
        // this.TransactionList = res.json().data;
        this.TotalInTransactions = res.json().total;
        // this.TotalTransactionsEachPage = res.json().slice_size;
        this.InPages = (this.TotalInTransactions / 10);      
        this.TotalInTransactionPages = (this.InPages>parseInt(this.InPages.toString()))?(parseInt(this.InPages.toString())+1):parseInt(this.InPages.toString());
        this.pageNumberForInTransaction=pageNumberForInTransaction;
        // console.log('total pages:'+this.TotalTransactionPages+'@ current page:'+pageNumberForTransaction);
        
      })
    }
    else if(kind == 'outtxs'){
      this.api.getOutTx(this.address,pageNumberForOutTransaction).subscribe(res => {
        console.log(res.json());
        this.outAddressTxs = res.json().data;
        // this.TransactionList = res.json().data;
        this.TotalOutTransactions = res.json().total;
        // this.TotalTransactionsEachPage = res.json().slice_size;
        this.OutPages = (this.TotalOutTransactions / 10);      
        this.TotalOutTransactionPages = (this.OutPages>parseInt(this.OutPages.toString()))?(parseInt(this.OutPages.toString())+1):parseInt(this.OutPages.toString());
        this.pageNumberForOutTransaction=pageNumberForOutTransaction;
        // console.log('total pages:'+this.TotalTransactionPages+'@ current page:'+pageNumberForTransaction);
        
      })
    }
    
    this.loading = false;
  }

  
  jumpEvent(pageNumber,$usedFor){
    if ($usedFor=='intx') {
      if(pageNumber <= this.TotalInTransactionPages && pageNumber > 0){
        this.fetchTransaction("intx",pageNumber-1,0);
        console.log(pageNumber)
        this.InSearchPage = '';
      }
      else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Please enter valid page!',
        })
        this.blockSearchPage = '';
      }
    }
    else if($usedFor=='outtxs') {
      if(pageNumber <= this.TotalOutTransactionPages && pageNumber > 0){
        this.fetchTransaction('outtxs',0,pageNumber-1);
        console.log(pageNumber)
        this.OutSearchPage = '';
      }
      else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Please enter valid page!',
        })
        this.OutSearchPage = '';
      }          
    }
  }

}

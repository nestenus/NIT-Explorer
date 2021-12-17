import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { HelperService } from '../service/helper/helper.service';
import { ApiService } from '../service/api/api.service'
import Swal from 'sweetalert2';

import { log } from 'util';
// import NitPipe from '../nit.pipe';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnChanges {
  public BlockList = '';
  public TransactionList = '';
  public TotalBlocks:number=0;
  public TotalTransactions:number=0;
  public headElementsForBlockList=[];
  public headElementsForTransactionList=[];
  public TotalBlocksEachPage:number=0;
  public TotalTransactionsEachPage:number=0;
  public TotalBlockPages:number=0;
  public TotalTransactionPages:number=0;
  public pageNumberForBlock:number=0;
  public pageNumberForTransaction:number=0;
  public isBlockPaginationShow=0;
  public isTransctnPaginationShow=0;
  public txSearchPage;
  public blockSearchPage;

  public loading = true;
  public txObject;
  public JSON;
  public Out = true;
  public address;
  constructor(public api : ApiService, public dialog: MatDialog,public router: Router, public helper: HelperService) {
    this.JSON = JSON;
    // this.checkoutForm = this.formBuilder.group({
    //   name: '',
    //   address: ''
    // });
  }

  ngOnInit() {
      // this.address = this.helper.getAddress();
      this.fetchLatestBlock(0);
      this.fetchTransaction(0);
      this.helper.selAcc.subscribe(x=>{
    })
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  // backToDashboard() {
  //   this.router.navigate(['dashboard'])
  // }

  fetchLatestBlock(pageNumberForBlock){
    // this.headElementsForBlockList = ['author','number','hash','transactions','timestamp'];

    // call to api to fetch blocks
    this.api.fetch_latest_blocks_api(pageNumberForBlock).subscribe(res => {
      console.log(res.json());

      this.BlockList = res.json().data;
      this.TotalBlocks = res.json().total;
      this.TotalBlocksEachPage = res.json().slice_size;
      let pages = (this.TotalBlocks / this.TotalBlocksEachPage);
      this.TotalBlockPages = (pages>parseInt(pages.toString()))?(parseInt(pages.toString())+1):parseInt(pages.toString());
      this.pageNumberForBlock=pageNumberForBlock;
    })
    this.loading = false;
  }


  fetchTransaction(pageNumberForTransaction){
    // this.headElementsForTransactionList = ['Hash','From','To','Value','Timestamp'];

    // call to api to fetch transactions
    this.api.fetch_transaction_api(pageNumberForTransaction).subscribe(res => {
      console.log(res.json());

      this.TransactionList = res.json().data;
      this.TotalTransactions = res.json().total;
      this.TotalTransactionsEachPage = res.json().slice_size;
      let pages = (this.TotalTransactions / this.TotalTransactionsEachPage);      
      this.TotalTransactionPages = (pages>parseInt(pages.toString()))?(parseInt(pages.toString())+1):parseInt(pages.toString());
      this.pageNumberForTransaction=pageNumberForTransaction;
      // console.log('total pages:'+this.TotalTransactionPages+'@ current page:'+pageNumberForTransaction);
      
    })
    this.loading = false;
  }

  onClickEvent($currentPageNumber,$number,$usedFor){
    if ($usedFor=='block') {
      this.fetchLatestBlock($currentPageNumber+$number);
    } else if($usedFor=='transctn') {
      this.fetchTransaction($currentPageNumber+$number);      
    }
  }

  jumpEvent(pageNumber,$usedFor){
    if ($usedFor=='block') {
      if(pageNumber <= this.TotalBlockPages && pageNumber > 0){
        this.fetchLatestBlock(pageNumber-1);
        console.log(pageNumber)
        this.blockSearchPage = '';
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
    else if($usedFor=='transctn') {
      if(pageNumber <= this.TotalTransactionPages && pageNumber > 0){
        this.fetchTransaction(pageNumber-1);
        console.log(pageNumber)
        this.txSearchPage = '';
      }
      else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Please enter valid page!',
        })
        this.txSearchPage = '';
      }          
    }
  }

  goToBlockDetails(block_number){
    // call api to fetch block details
    this.helper.setBlockNumber(block_number);
    this.router.navigate(['block']);
  }

  goToTransactionDetails(hash){
    // call api to fetch transaction details
    this.helper.setTransactionHash(hash);
    this.router.navigate(['tx']);
  }
}

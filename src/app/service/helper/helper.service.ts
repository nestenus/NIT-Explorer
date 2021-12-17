import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Web3 from 'web3';
import HdKeyring from 'eth-hd-keyring'
import Mnemonic from 'bitcore-mnemonic'
import FileSaver from 'file-saver';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
// import 'rxjs/add/observable/of';
import { jsonpFactory } from '@angular/http/src/http_module';

export class HelperService {
  public web3;
  public account;
  public accountList=[];
  public accObeservable = {
    accounts: [],
    balances: {}
  };

  public accountListBalance = {};
  public accountLoaded = false;
  public currentAccount = {
    balance: 0,
    symbol: 'NIT'
  };
  public walletInfo = {
    total:1,
    selected:0
  };
  public ongoingTx;
  public slectedAddress;
  public currencAddress;
  public globalPause = false;
  public globalPassword: any;
  public receipt;
  public transactionList = [];
  public lookedBlock;
  public hdkeyring;
  public map = new Map<object, object>();
  public algorithm = 'aes-256-cbc';

  public currentBlock=null;
  public currentHash=null;
  public currentAddress=null;

  constructor(public router: Router) {
    if (!this.globalPassword) {
      // router.navigate(['login']);
    }
    this.web3 = new Web3(null);
    // this.web3.setProvider('http://18.***.***.0:8545');
    this.web3.eth.defaultGasPrice = 0;

  }

@Output() newAcc : EventEmitter<any> = new EventEmitter();
@Output() selAcc : EventEmitter<any> = new EventEmitter();



  async checkBalance() {
    return await this.web3.eth.getBalance(this.accountList[this.slectedAddress]).then((x) => {
      this.currentAccount.balance = this.web3.utils.fromWei(x);
      console.log(this.currentAccount.balance)
      return this.currentAccount.balance
    });
  }
  async getBalance(acc) {
    return await this.web3.eth.getBalance(acc).then((x) => {
      return Promise.resolve(this.web3.utils.fromWei(x));
    });
  }

  getAddress(){
    this.currencAddress = this.accountList[this.slectedAddress]
    return this.currencAddress;
  }

  save() {
    this.web3.eth.accounts.wallet.save(this.globalPassword, 'nit_wallet');
  }

  encrypt(text, passPhrase) {
    let encrypted = CryptoJS.AES.encrypt(text, passPhrase);
    window.localStorage.setItem('nesten_hd', encrypted)
    window.localStorage.setItem('wallet_info', JSON.stringify(this.walletInfo));
  }

  decrypt(passPhrase) {
    try{
    let cyphered = window.localStorage.getItem('nesten_hd');
    var bytes = CryptoJS.AES.decrypt(cyphered.toString(), passPhrase);
    let decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypted : ", decrypted)
    return decrypted;
    }
    catch(error){
      // alert("Wrong Pin")
      console.log("Error: "+ error)
    }
  }

  saveAsFile(words) {
    let blob = new Blob([words], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "nestenwallet.txt");
  }

  generateSeed() {
    let words = new Mnemonic(Mnemonic.Words.ENGLISH).toString();
    console.log("WORDS", words)
    return words;
  }
  initHdWallet(mnemonic,walletobj) {
    this.hdkeyring = new HdKeyring({
      mnemonic: mnemonic,
      numberOfAccounts: walletobj.total,
    })
  }

  seeMap(){
    console.log("Map:- ", this.map)
    let keys = Array.from( this.map.keys());
    let values = Array.from( this.map.values());
    let list : object[][] = [
      keys, values
    ]
    console.log(keys, values);
    return (list);
    
  }

  removeWallet(){
    window.localStorage.removeItem('nesten_hd');
    window.location.reload()
  }

  async loadWalletWithSeedWord(passPhrase) {

    let mnemonic = await this.decrypt(passPhrase);
    if (!mnemonic) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Wrong Key'        
      })
      return false;
    } else {
      let walletObj = JSON.parse(window.localStorage.getItem('wallet_info'));
      await this.initHdWallet(mnemonic,walletObj);
      // Till this ok

      this.accountList = await this.hdkeyring.getAccounts(); // All accounts is in the list
      console.log("LIST ", this.accountList)
      console.log("accountBalList ",this.accountListBalance)

      await this.balanceFiller();
      this.slectedAddress = walletObj.selected; // By default 0 is selected

      this.router.navigate(['dashboard']);
      return true;
    }
  }

  async balanceFiller(){
    let rtrn = await this.accountList.map(async address=>{
      return await this.web3.eth.getBalance(address).then((blnc) => {
        this.accountListBalance[address]=this.web3.utils.fromWei(blnc)
            return address; 
      });
    })
    Promise.all(rtrn).then(x=>{
      this.newAcc.emit(null)

      console.log(x)
    })
  }

  async createAddress(passPhrase){
    console.log("helper create address visited")
    let mnemonic = await this.decrypt(passPhrase);
    if (mnemonic) {
      let walletObj = JSON.parse(window.localStorage.getItem('wallet_info'));
      walletObj.total = Number(walletObj.total)+1;
      console.log(walletObj.total)
      window.localStorage.setItem('wallet_info', JSON.stringify(walletObj));

      await this.initHdWallet(mnemonic,walletObj);

      this.accountList = await this.hdkeyring.getAccounts(); // All accounts is in the list
      console.log("LIST ", this.accountList)
      this.slectedAddress = walletObj.selected; // By default 0 is selected
      await this.balanceFiller();

      // this.router.navigate(['dashboard']);
      return true;
    }else {
      setTimeout(()=>{Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Wrong Key'
      })},500);
      console.log("EROROR")
      return false;
    }
  }

  selectAddress(addressPosition){

    let walletObj = JSON.parse(window.localStorage.getItem('wallet_info'));
    if(addressPosition <= walletObj.total) {
      walletObj.selected = addressPosition;
      window.localStorage.setItem('wallet_info', JSON.stringify(walletObj));
      this.slectedAddress = addressPosition;
      console.log("New Default address : ",this.accountList[this.slectedAddress])
    }
    this.selAcc.emit(null)
  }


  async sendNit(to, value, cb) {
    if (this.web3.utils.isAddress(to)) {
      try {
        this.globalPause = true;
        let privateKey = await this.hdkeyring.exportAccount(this.accountList[this.slectedAddress]);
        this.web3.eth.accounts.signTransaction({
          to: to,
          value: this.web3.utils.toWei(value),
          gas: 2000000,
          gasPrice: 0
        }, '0x'+privateKey).then(tx => {
          this.web3.eth.sendSignedTransaction(tx.rawTransaction)
            .on('transactionHash', hash => {
              console.log("hash", hash);
            }).on('receipt', receipt => {
            this.receipt = receipt;
            this.globalPause = false;
            console.log("receipt", receipt);
            cb(true, "Transaction Successfull");
          }).catch(x => {
            console.log("ERROR :", x);
            this.globalPause = false;
            cb(false, x)
          });
        })
      }
      catch (error) {
        console.log("error", error)
        cb(false, "Transaction failed");
      }
    }
    else {
      cb(false, "Please enter valid address");
    }
  }


  async setBlockNumber(blockNumber) {
    this.currentBlock=blockNumber;
  }

  async setTransactionHash(hash) {
    this.currentHash=hash;
  }

  async setAddress(address) {
    this.currentAddress=address;
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HelperService } from '../helper/helper.service';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = environment.apiUrl;


  constructor(public http: Http, public helper: HelperService) {
  }
  getOutTx(address, slice):Observable<any>{
    return this.http.get(this.apiUrl + '/addresses/' + address + '/outtxs/' + slice);
   }
   getInTx(address, slice):Observable<any>{
    return this.http.get(this.apiUrl + '/addresses/' + address + '/intxs/' + slice);
   }


  // fetch all block list
  fetch_latest_blocks_api(slice):Observable<any>{
    return this.http.get(this.apiUrl + '/blocks?slice='+slice);
  }

  // fetch all transaction list
  fetch_transaction_api(slice):Observable<any>{
    return this.http.get(this.apiUrl + '/transactions?slice='+slice);
  }

  // fetch one block details
  fetch_block_details(slice):Observable<any>{
    return this.http.get(this.apiUrl + '/blocks/'+slice);
  }

  // fetch one transaction details
  fetch_transaction_details(slice):Observable<any>{
    return this.http.get(this.apiUrl + '/transactions/'+slice);
  }

  // fetch one address details
  fetch_address_details(slice):Observable<any>{
    return this.http.get(this.apiUrl + '/addresses/'+slice);
  }


}

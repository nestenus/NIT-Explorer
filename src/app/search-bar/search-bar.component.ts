import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onSubmit(frmData) {
    // console.log(frmData);

    if(/^0x[a-fA-F0-9]{40}$/.test(frmData.search)){ // call to address
      window.location.assign('/address/'+frmData.search);
    } else if(/^0x([A-Fa-f0-9]{64})$/.test(frmData.search)) { // call to transcation
      window.location.assign('/tx/'+frmData.search);
    } else if(/^[0-9]*$/.test(frmData.search)) { // call to block
      window.location.assign('/block/'+frmData.search);
    } else {
      Swal.fire({
        type: 'error',
        title: 'Invalid Value',
        text: 'Sorry,Not a valid NIT chain parameter!',
        footer: ''
      })
      
    }
  }
}

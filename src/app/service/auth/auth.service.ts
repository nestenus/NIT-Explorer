import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setUser(user){
  	localStorage.setItem("nestenUserAuth", JSON.stringify(user));
  }

  user(){
    return JSON.parse(localStorage.getItem("nestenUserAuth"));
  }

  removeUser(){
    localStorage.removeItem("nestenUserAuth");
  }

  isGuest(){
    return !this.user();
  }

}

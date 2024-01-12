import { Component } from '@angular/core';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompaniesToken';
  regOszlop=[  "username","firstName","lastName","email","password"]
  logOszlop=[  "username","password"]
  registrationModel:any={
    "username": "",
    "firstName": "",
    "lastName": "",

    "email": "",
    "password": ""
  }
  loginModel:any={
    "username": "", 
    "password": ""
  }

  users:any=[]
  companies:any=[]
  constructor(private base:BaseService, private auth:AuthService){

  }

  signUp(){
    this.auth.signUp(this.registrationModel).subscribe(
      {
        next: (res)=>console.log("Regisztráció sikeres", res),
        error: (res)=> console.log("Sikertelen regisztráció", res)
      }
    )
  }
  signIn(){
    this.auth.signIn(this.loginModel).subscribe(
      {
        next: (res)=>{
          localStorage.setItem("token",res)
          console.log("Login:", res)
      },
        error: (res)=> console.log("Login Hiba:", res)
      }
    )
  }
  getUsers(){

    this.auth.getUsers().subscribe(
      (res)=> {
        this.users=res
        for (const iterator of this.users) {
            this.auth.getRoles(iterator.id).subscribe(
              (res)=>{iterator.roles=res}
            )
        }
      }
    )
  }
  getCompanies(){
    this.base.getCompanies().subscribe(
      (res)=> this.companies=res
    )
  }
  
}

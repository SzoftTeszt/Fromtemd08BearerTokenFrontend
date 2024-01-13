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
  roles=["User", "Admin","SAdmin"]
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
    this.auth.signIn(this.loginModel)
  }
  
  getUsers(){

    this.auth.getUsers().subscribe(
      (res)=> {
        this.users=res
        for (const iterator of this.users) {
            this.auth.getRoles(iterator.id).subscribe(
              (res)=>{
                console.log("Roles",res)
                if (res instanceof Array)
                    iterator.roles=res
                else iterator.roles=[]
              }
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
  logout(){
    this.auth.logout()
  }
  roleChange(user:any,role:any){
      if (user.roles.includes(role)){
        user.roles=user.roles.filter((r:any)=>r != role)
      }
      else user.roles.push(role)
      this.auth.setRoles(user.id, user.roles).subscribe()
  }
}

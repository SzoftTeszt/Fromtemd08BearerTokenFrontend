import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://jwttokenapi20240112232632.azurewebsites.net/api/"
  // url="https://localhost:5001/api/"
  user:any
  userSub= new Subject()
  constructor(private http:HttpClient) { }

  getUser(){
    return this.userSub
  }

  signUp(body:any){
    return this.http.post(this.url+"Authentication/register", body)
  }

  signIn(body:any){
    return this.http.post(this.url+"Authentication/login", body, {responseType:'text'}).subscribe(
      {
        next: (res)=>{
          localStorage.setItem("token",res)
          console.log("Login:", res)
      },
        error: (res)=> console.log("Login Hiba:", res)
      }
    )
  }

  getRoles(id:string){
    return this.http.get(this.url+"userClaims/"+id, {headers:this.getHeader()})
  }

  setRoles(id:string, roles:any){
    let body={id:id, roles:roles}
    return this.http.post(this.url+"userClaims/", body,{headers:this.getHeader()})

  }

  public getHeader(){
    let token= localStorage.getItem("token")
    let header;
    if (token)
    {
      header = new HttpHeaders().set('Authorization', 'Bearer '+token)
    }
    return header
  }
 
  getUsers(){
    return this.http.get(this.url+"userList", {headers:this.getHeader()})
  }

  logout(){
    localStorage.clear()
  }

}

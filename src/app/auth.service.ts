import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://jwttokenapi20240112232632.azurewebsites.net/api/"
  // url="https://localhost:5001/api/"
  constructor(private http:HttpClient) { }

  signUp(body:any){
    return this.http.post(this.url+"Authentication/register", body)
  }

  signIn(body:any){
    return this.http.post(this.url+"Authentication/login", body, {responseType:'text'})
  }

  getRoles(id:string){
    return this.http.get(this.url+"userList/"+id, {headers:this.getHeader()})
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

}

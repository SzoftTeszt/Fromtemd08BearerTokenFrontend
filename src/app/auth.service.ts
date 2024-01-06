import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://jwttokenapi20240105193456.azurewebsites.net/api/"
  // url="https://localhost:5001/api/"
  constructor(private http:HttpClient) { }

  signUp(body:any){
    return this.http.post(this.url+"Authentication/registeration", body)
  }

  signIn(body:any){
    return this.http.post(this.url+"Authentication/login", body, {responseType:'text'})
  }

  getRoles(id:string){
    return this.http.get(this.url+"userList/"+id, {headers:this.getHeader()})
  }

  getHeader(){
    let token= localStorage.getItem("token")
    let header;
    if (token)
    {
      header = new HttpHeaders().set('Authorization', 'Bearer '+token)
    }
    return header
  }

  evryRoles(){
    let id="1a79febc-e80c-4cc9-b1d8-a678f9111e24"
    let roles= ['User', 'Admin', 'SAdmin']
    let body={id:id, roles:roles}
    return this.http.post(this.url+"userList",body ,{headers:this.getHeader()})
  }

}

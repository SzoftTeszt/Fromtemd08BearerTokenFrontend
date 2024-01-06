import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url="https://jwttokenapi20240105193456.azurewebsites.net/api/"
  // url="https://localhost:5001/api/"
  constructor(private http:HttpClient) { }

  getHeader(){
    let token= localStorage.getItem("token")
    let header;
    if (token)
    {
      header = new HttpHeaders().set('Authorization', 'Bearer '+token)
    }
    return header
  }

  getCompanies(){
    return this.http.get(this.url+"Companies", {headers:this.getHeader()})
  }
  getUsers(){
    return this.http.get(this.url+"userList", {headers:this.getHeader()})
  }

  setClaims(id:string){
    
  }
}

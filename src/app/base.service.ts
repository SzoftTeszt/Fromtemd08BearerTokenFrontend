import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  url="https://jwttokenapi20240112232632.azurewebsites.net/api/"
  // url="https://localhost:5001/api/"
  constructor(private http:HttpClient, private auth:AuthService) { }

  

  getCompanies(){
    return this.http.get(this.url+"Companies", {headers:this.auth.getHeader()})
  }
  


}

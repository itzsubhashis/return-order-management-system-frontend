import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  validateMsg='Invalid';
  url = "http://localhost:8080"
  
constructor(private http:HttpClient) { }

  generateToken(credentials:any) {
    return this.http.post(`${this.url}/auth/authenticate`,credentials)
  }

  loginUser(token: any)
  {
    localStorage.setItem("token",token)
    return true;
  }
  checkValidity()
  {
    let token =localStorage.getItem("token")
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token!=null?token:'',
      }), };
    return this.http.post(`${this.url}/auth/validate`,null,httpOptions)

  }
  logOutUser(){
    localStorage.removeItem("token")
    window.sessionStorage.clear();
    return true;
  }
  makePayment(payment:any) {
    
      let token =localStorage.getItem("token") 
      const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token!=null?token:'',
      }), };
      console.log(token)
      return this.http.post(`${this.url}/process/CompleteProcessing`,payment,httpOptions)
  }
  getAllCompletedProcess() {
    
      let token =localStorage.getItem("token") 
      const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token!=null?token:'',
      }), };
      console.log(token)
      return this.http.get(`${this.url}/process/processlist`,httpOptions)
  }
  

}

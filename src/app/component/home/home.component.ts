import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService:LoginService,private http: HttpClient ) { }
  
  isAuthorized=false;
  ngOnInit(): void {
    this.checkIfValid()
  }

  checkIfValid()
  {
    this.loginService.checkValidity().subscribe(
      (response:any)=>{
      },
      error=>{
          console.log(error.error.text);
          if(error.error.text=="Valid")
            this.isAuthorized=true
          else{
            this.isAuthorized=false
          }
      });
  }

}

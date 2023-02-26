import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';


export class Payment {
  processid=''
  requestid=''
  cardnumber=''
  processingCharge=''
}

@Component({
  selector: 'app-returnlist',
  templateUrl: './returnlist.component.html',
  styleUrls: ['./returnlist.component.css']
})
export class ReturnlistComponent implements OnInit {

  constructor(private loginService:LoginService,private http: HttpClient) { }
  msgvaliditytoken=''
  isAuthorized=false;
  paymentList:Payment[]=[]
  ngOnInit(): void {
    this.checkIfValid()
    this.viewRequestList()
  }

  viewRequestList(){
    this.loginService.getAllCompletedProcess().subscribe(
      data=>{
         console.log(data)
         this.paymentList= <Payment[]>data;
      } 
    )
  }

  checkIfValid()
  {
    this.loginService.checkValidity().subscribe(
      (response:any)=>{
          // console.log(response.error);
      },
      error=>{
          console.log(error.error.text);
          if(error.error.text=="Valid")
            this.isAuthorized=true
          else{
            this.isAuthorized=false
            this.msgvaliditytoken=error.error.text
          }
      });
  }
 
}

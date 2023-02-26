import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

export class Payment {
  processid=''
  requestid=''
  cardnumber=''
  processingCharge=''
}
@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})

export class ProcessComponent implements OnInit {
  errMsgQuantity=false
  errMsgcomponentName=false
  errMsgComponentType=false
  errmsgContact=false
  errmsgName=false
  paymentClass=''
  errmsg=false
  msgvaliditytoken=''
  payment={
    processid:'',
    requestid:'',
    cardnumber:'',
    creditLimit:0,
    processingCharge:''
  }
  paymentList:Payment[]=[]
  msgError=''
  currentview='processrequest'
  processrequest={
    name:'',
    userid:'',
    contactno:'',
    componentType:'',
    componentName:'',
    quantity:0,
    priority:''
  }
  processresponse={
    requestId:'',
    processingCharge:'',
    packagingAndDeliveryCharge:'',
    dateOfDelivery:''
  }
  paymentDone=''
  msgForReturnForm=''
  isAuthorized=false;
  constructor(private loginService:LoginService,private http: HttpClient) { }
  ngOnInit(): void {
    this.paymentClass=''
    this.errmsg=false
    this.msgvaliditytoken=''
    this.loginService.checkValidity().subscribe(
      request=>{},
      error=>{
        console.log(error.error.text);
        if(error.error.text==="Valid")
          this.isAuthorized=true
      }
    )
    console.log(this.isAuthorized)
    this.paymentDone=''
    this.currentview='returnreqview'
  }
  checkIfValid()
  {
    this.loginService.checkValidity().subscribe(
      (response:any)=>{
          // console.log(response.error);
      },
      error=>{
          console.log(error.error.text);
          if(error.error.text==="Valid")
            this.isAuthorized=true
          else{
            this.isAuthorized=false
            this.msgvaliditytoken=error.error.text
          }
      });
  }
  returnreqSubmit(){
    if(this.reqFormIsFilled()){
      this.checkIfValid()
      let url = "http://localhost:8080/process"
      let token =localStorage.getItem("token")  
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': token!=null?token:''
        }), };
         this.http.post(`${url}/processdetail`,this.processrequest,httpOptions).subscribe(
        (response:any)=>{
            console.log(<any>response);
            this.processresponse=response
        },
        error=>{
            console.log(error)
            throw error;
        });
        this.currentview='processview'
        }
        else{
          this.msgError='Some error happened'
        }
    }
  clearForm() {
      this.processrequest.componentName=''
      this.processrequest.componentType=''
      this.processrequest.name=''
      this.processrequest.contactno=''
      this.processrequest.priority=''
      this.processrequest.quantity=0
      this.errmsg=false
      this.msgError=''
  }
  returnReq(){
    this.currentview='returnreqview'
    this.errmsg=false
  }
  confirmPaymentDetails() {
    this.checkIfValid()
    this.payment.processingCharge=this.processresponse.packagingAndDeliveryCharge+this.processresponse.processingCharge
    this.currentview='paymentview'
    this.msgError=''
    this.errmsg=false
    this.paymentClass=''
  }
  goBackToConfirmPage() {
    this.currentview='processview'
    this.errmsg=false
  }
  makePayment() {
    this.checkIfValid()
    console.log(this.paymentDetailsAreFilled())
    if(this.paymentDetailsAreFilled()) {
      this.payment.requestid=this.processresponse.requestId
      this.payment.processingCharge=this.processresponse.packagingAndDeliveryCharge+this.processresponse.processingCharge
      console.log(this.payment.processingCharge)
      this.loginService.makePayment(this.payment).subscribe(
        (response:any)=>{
        },
        error=>{
          console.log(error.error.text)
          this.errmsg=true
          if(error.error.text==='Payment Completed Successfully')
            this.paymentClass="alert alert-success alert-dismissible fade show"
          else
            this.paymentClass="alert alert-warning alert-dismissible fade show"
         this.paymentDone=error.error.text
        });
    }
    else {
    this.paymentDone='Please enter valid details'
    this.paymentClass="alert alert-danger alert-dismissible fade show"
    this.errmsg=true
    }
  }

  reqFormIsFilled(){
    this.errmsgName=false
    this.errmsgContact=false
    this.errMsgComponentType=false
    this.errMsgcomponentName=false
    this.errMsgQuantity=false
    var pattern=new RegExp("^[a-zA-Z ]+$")
    if(this.processrequest.name.trim().length==0||(!pattern.test(this.processrequest.name))) {
      this.errmsgName=true
    }
    if(!pattern.test(this.processrequest.componentType)) {
      this.errMsgComponentType=true
    }
    if(!pattern.test(this.processrequest.componentName)){
      this.errMsgcomponentName=true
    }
    pattern=new RegExp("^[1-9]{1}[0-9]{9}$")
    if(!pattern.test(this.processrequest.contactno)) {
      this.errmsgContact=true
    }
    if(this.processrequest.quantity<=0)  
    {
      this.errMsgQuantity=true
    }
    if(this.errMsgComponentType||this.errMsgQuantity||this.errMsgcomponentName||this.errmsgContact||this.errmsgName)
      return false;
    else
      return true;
  }
  paymentDetailsAreFilled() {
        if(!this.payment.cardnumber.match("^[a-zA-Z]")&&this.payment.creditLimit>=0)
            return true;
        else
            return false;

  }
  
}

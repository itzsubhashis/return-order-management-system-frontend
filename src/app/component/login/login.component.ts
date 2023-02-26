import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginErrMsg=''
  loginError=false; 
  errorColor='' 
  credentials={
      username:'',
      password:''
    }
    constructor(private loginService:LoginService) { }
  
    ngOnInit(): void {
      this.loginError=false;
    }
  
    onSubmit()
    {
      if(this.checkIfInvalid())
        return;
      this.loginService.generateToken(this.credentials).subscribe(
        (response:any)=>{
            console.log(response.token);
            this.loginService.loginUser(response.token)
            window.location.href='/home'
        },
        error=>{
            console.log(error);
            this.loginError=true;
            this.errorColor="red"
            this.loginErrMsg='Unfortunately,login failed! Please enter valid credentials and try again'
        })
        this.credentials.password=''
        this.credentials.username=''
    }
    clear(){
      this.credentials.password=''
      this.credentials.username=''
    }

    checkIfInvalid() {
      var loginUserErr:boolean=false;
      var loginPassErr:boolean=false;
      this.loginErrMsg=''
      if(this.credentials.username.trim()==''&&this.credentials.username.length<2) {
        this.loginErrMsg='Enter username having min 2 characters'
        this.loginError=true;
        loginUserErr=true;
      }
      if(this.credentials.password.trim()==''&&this.credentials.password.length<2) {
        if(this.loginErrMsg)
        this.loginErrMsg=this.loginErrMsg+' and enter valid password'
        else
        this.loginErrMsg='Enter valid password'
        this.loginError=true;
        loginPassErr=true;
      }
      if(loginUserErr||loginPassErr){
        this.errorColor="orange"
        return true;
      }
      return false;
    }
  
}
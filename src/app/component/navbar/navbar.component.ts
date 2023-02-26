import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService:LoginService,private router: Router) { }
  
  homenav='nav-link'
  processnav='nav-link'
  reqListnav='nav-link'
  displayNav=true
  isAuthorized=false
  ngOnInit(): void {
    this.loginService.checkValidity().subscribe(
      request=>{},
      error=>{
        console.log(error.error.text);
        if(error.error.text==="Valid")
          this.isAuthorized=true
      }
    )
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          console.log('this.router.url', this.router.url);
          if(this.router.url==='/') {
            this.displayNav=false
          }
          if(this.router.url==='/home') {
            this.homenav='nav-link active'
            this.processnav='nav-link'
            this.reqListnav='nav-link'
          }
          if(this.router.url==='/process') {
            this.homenav='nav-link'
            this.processnav='nav-link active'
            this.reqListnav='nav-link'
          }
          if(this.router.url==='/returnlist') {
            this.homenav='nav-link'
            this.processnav='nav-link'
            this.reqListnav='nav-link active'
          }
    
        }
      }
    );  
  }
  


  logout():void {
    this.loginService.logOutUser()
    window.location.href=''
  }

  goHome(){
    window.location.href='/home'
  }

  newReq() {
    window.location.href='/process'
  }

  viewAllReq() {
    window.location.href='/returnlist'
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessComponent } from './component/process/process.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ReturnlistComponent } from './component/returnlist/returnlist.component';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProcessComponent,
    NavbarComponent,
    ReturnlistComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

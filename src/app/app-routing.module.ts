import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProcessComponent } from './component/process/process.component';
import { ReturnlistComponent } from './component/returnlist/returnlist.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'process',
    component:ProcessComponent,
    pathMatch:'full'
  },
  {
    path:'returnlist',
    component:ReturnlistComponent,
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

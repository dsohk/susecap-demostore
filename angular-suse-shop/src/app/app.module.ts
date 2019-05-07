import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes:Routes = [
  { path: '', redirectTo: '/show', pathMatch: 'full' },
  { path: 'show', component: OrderFormComponent },
  //{ path: 'site', component: QRCodeComponent },
  { path: 'dash', component: DashboardComponent} //,
  //{ path:'**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes, 
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

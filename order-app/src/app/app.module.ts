import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { OrderFormComponent } from './order-form/order-form.component';


const appRoutes:Routes = [
  //{ path: '', redirectTo: '/show', pathMatch: 'full' },
  { path: '', component: OrderFormComponent }
  //{ path: 'site', component: QRCodeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
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

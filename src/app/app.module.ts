import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { SeverityComponent } from './severity/severity.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './Services/authentication.service';
import { ServerErrorComponent } from './server-error/server-error.component';
import { UnauthorizedErrorComponent } from './unauthorized-error/unauthorized-error.component';
import { AuthURL, QuesURL, SeverityURL } from './Models/tokens';


const appRoutes: Routes=[
  {path:'', component:LoginComponent},
  {path:'checklist', component:ChecklistComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:SeverityComponent},
  {path:'unauthorisedError',component:UnauthorizedErrorComponent},
  {path:'serverError', component:ServerErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ChecklistComponent,
    SeverityComponent,
    ServerErrorComponent,
    UnauthorizedErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    {provide:AuthURL, useValue:'https://authorizationmicrosvc.azurewebsites.net/api/users/authenticate'},
    {provide:QuesURL, useValue:'https://auditchecklistmicrosvc.azurewebsites.net/api/AuditChecklist/GetAuditTypeQuestions/'},
    {provide:SeverityURL, useValue:'https://auditseveritymicrosvc.azurewebsites.net/api/AuditSeverity/AuditSeverity/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthenticationService{
    private username:string="";
    private password:string="";
    private message:string="";
    private autUrl="https://authorizationmicrosvc.azurewebsites.net/api/users/authenticate";
  public isAuth:boolean=false;


    constructor( private http: HttpClient,
      private route:Router ){


    }
    headers={
      headers: new HttpHeaders({
          'Content-Type': 'application/json',

      })
    }

    getUserName(){
        return this.username;
    }

}




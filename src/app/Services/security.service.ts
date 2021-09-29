import { Injectable } from "@angular/core";
import { User } from '../Models/User.model';

@Injectable({providedIn: 'root'})

export class Security{
    
   private currentUser:User={userName:"",isLogin:false};


    setStatus(name:string, value:boolean){
        this.currentUser.userName=name;
        this.currentUser.isLogin=value;
    }

    getUserName()
    {
        return this.currentUser.userName;
    }

    checkLogin(){
        return this.currentUser.isLogin;
    }

    clearLogin(){
        this.currentUser.isLogin=false;
        this.currentUser.userName="";
    }
}
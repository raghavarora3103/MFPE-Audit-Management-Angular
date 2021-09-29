import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import { Security } from '../Services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthenticationService,
    private route:Router,
    private security:Security
    ) { }

  public username:string= this.security.getUserName();
  ngOnInit(): void {
    
  }

  logout(){
    this.security.clearLogin();
    localStorage.clear();
    this.route.navigate(['']);
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-error',
  templateUrl: './unauthorized-error.component.html',
  styleUrls: ['./unauthorized-error.component.css']
})
export class UnauthorizedErrorComponent implements OnInit {

  constructor(
    private route:Router
  ) { }

  ngOnInit(): void {
  }
  goBack(){
        this.route.navigate(['']);
  }

}

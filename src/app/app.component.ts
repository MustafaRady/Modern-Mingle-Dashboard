import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit
{
  isAuthenticated: boolean = true;

  constructor(
    private router:Router,
    private authService:AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        console.log(user)
        this.isAuthenticated = !!user
      }
    )
  }
}

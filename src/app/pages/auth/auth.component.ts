import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { LoginResponse } from '../../model/loginResponse';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  error:string = '';

  register: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {
    
  }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (data:LoginResponse)=>{
          this.router.navigate(['/dashboard'])
        },error=>{
          this.handleError(error);
        }
      
      );
      
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const {email,password} = this.registerForm.value;
      this.authService.register(email,password)
    }
  }

  toggleAuth(){
    this.register = !this.register
  }

  handleError(error:any){
    const errorMessage = this.getErrorMessage(error.code)
    this.error = errorMessage
  }

  getErrorMessage(errorCode:string):string{
    const errorMapping: { [key: string]: string } = {
      'auth/user-disabled': 'This user has been disabled.',
      'auth/user-not-found': 'No user found with this email.',
      'auth/invalid-credential': 'Incorrect credentials',
      // Add more mappings as needed
    };

    return errorMapping[errorCode] || 'An unknown error occurred. Please try again.';
  }
}

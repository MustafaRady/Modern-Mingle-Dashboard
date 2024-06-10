import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  email: string = '';
  constructor(
    private authService:AuthService
  ) {
    this.authService.getUser().subscribe(
      user => {
        this.email=user?.email || null;
      }
    )
  }

  onLogout(){
    console.log('logout');
    this.authService.logout().subscribe()
  }
}

// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, map } from 'rxjs';
import { LoginResponse } from '../model/loginResponse';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    constructor(private afAuth: AngularFireAuth) {}

    register(email: string, password: string): Observable<any> {
        return from(this.afAuth.createUserWithEmailAndPassword(email, password))
    }

    login(email: string, password: string): Observable<any> {
      return from(this.afAuth.signInWithEmailAndPassword(email, password));
    }

    getUser() {
      return this.afAuth.authState;
    }

    logout(){
      return from(this.afAuth.signOut());
    }
    
}

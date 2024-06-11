import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable, from } from 'rxjs';
import { Product } from '../model/product';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap,of } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private angularFirestore:AngularFirestore,
    private storage:AngularFireStorage,
    private afAuth: AngularFireAuth,
    private router:Router
  ) {
    this.afAuth.authState.subscribe(
      user=>{
        if(!user){
          this.router.navigate(['/dashboard'])
        
      }
    }
    )
  }



  getProducts():Observable<any[]>{
    return this.angularFirestore.collection('garments').valueChanges({idField:'id'})
  }

  addProduct(product:Product):Observable<any>{
    return from(this.angularFirestore.collection('garments').add(product))
  }

  deleteProduct(product:Product):Observable<any>{
    return from(this.angularFirestore.collection('garments').doc(product.id).delete());
    
  }

  updateProduct(product:Product):Observable<any>{
    console.log(product)
    return from(this.angularFirestore.collection('garments').doc(product.id).update(product))
  }

  deleteImage(imageUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (imageUrl) {
        console.log("Image URL:", imageUrl);
        let fileRef;
        if (imageUrl.startsWith('http')) {
          // It's a full URL
          fileRef = this.storage.refFromURL(imageUrl);
          console.log(fileRef);
        } else {
          // It's a child path
          fileRef = this.storage.ref(imageUrl);
        }
        fileRef.delete().subscribe({
          next: () => resolve(),
          error: (err) => reject(err)
        });
      } else {
        resolve();
      }
    });
  }
}

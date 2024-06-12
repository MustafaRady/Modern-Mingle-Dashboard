import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { finalize } from 'rxjs/operators';
import { createProductForm } from '../../service/formBuilder/formbuilder';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  showPopup = false;
  productForm: FormGroup;
  selectedFile: File | null = null;
  previousImageUrl: string;
  availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL'];
  product:Product;
  isLoading: boolean = false;
  imageUrl: string | ArrayBuffer | null = null;
  categories: string[] = [
    'T-Shirts',
    'Jackets',
    'Dresses',
    'Pants',
    'Skirts',
    'Sweaters',
    'Shorts',
    'Coats',
    'Blouses',
    'Shoes'
  ];

  constructor(
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private fb: FormBuilder
  ) {
    this.product = data 
    this.productForm = createProductForm(this.fb,this.product);

  }

  ngOnInit(): void {
    this.addSizeControls();
    this.previousImageUrl = this.product.imageUrl;
    this.imageUrl = this.product.imageUrl;
  }

  onFileSelected(event: any) {
    if(event.target.files[0] == null){
      console.log("Empty image")
      return
    }
    this.selectedFile = event.target.files[0];
    this.productForm.patchValue({ image: this.selectedFile });
    this.productForm.get('image')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = e => this.imageUrl = reader.result;
    reader.readAsDataURL(this.selectedFile);
  }

  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.selectedFile) {
        const filePath = `images/${Date.now()}_${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);

        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              resolve(url);
            }, err => reject(err));
          })
        ).subscribe();
      } else {
        reject('No file selected');
      }
    });
  }

  

  onSubmit() {
    this.isLoading = false;
    this.showPopup = true;
    
    // const formValue = this.productForm.value;
    // formValue.sizes = formValue.sizes.map((checked: boolean, i: number) => checked ? this.availableSizes[i] : null).filter((value: string | null) => value !== null);
    // formValue.materials = formValue.materials.filter((material: string) => material !== '');

    // let previousImageUrl = this.productForm.get('image')?.value;
    // console.log(previousImageUrl)
  

    // if(
    //     this.previousImageUrl != this.productForm.get('image')?.value
        
    // ){
      
      
    //   this.productService.deleteImage(this.previousImageUrl);
    //   this.uploadImage().then((imageUrl: string) => {
        
    //     let product: Product = {
    //       name: formValue.name,
    //       price: formValue.price,
    //       description: formValue.description,
    //       subDescription: formValue.subDescription,
    //       category: formValue.category,
    //       sizes: formValue.sizes,
    //       colors: formValue.colors,
    //       materials: formValue.materials,
    //       brand: formValue.brand,
    //       inStock: formValue.inStock,
    //       rating: formValue.rating,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       imageUrl: imageUrl // Add the image URL to the product
    //     };

    //     const productDocRef = this.firestore.doc(`garments/${this.product.id}`);
    //     productDocRef.update(product).then(() => {
    //       console.log('Product updated successfully');
    //       this.isLoading=false
    //       this.dialogRef.close();
    //     }).catch(err => {
    //       this.isLoading=false
    //       console.error('Error updating product:', err);
    //     });
    //   }).catch(err => {
    //     console.error(err);
    //   });
    // }
    // else{
    //   let product: Product = {
    //     name: formValue.name,
    //     price: formValue.price,
    //     description: formValue.description,
    //     subDescription: formValue.subDescription,
    //     category: formValue.category,
    //     sizes: formValue.sizes,
    //     colors: formValue.colors,
    //     materials: formValue.materials,
    //     brand: formValue.brand,
    //     inStock: formValue.inStock,
    //     rating: formValue.rating,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     imageUrl: this.previousImageUrl // Add the image URL to the product
    //   };

    //   const productDocRef = this.firestore.doc(`garments/${this.product.id}`);
    //   productDocRef.update(product).then(() => {
    //     this.isLoading=false
    //     console.log('Product updated successfully');
    //     this.dialogRef.close();
    //   }).catch(err => {
    //     this.isLoading=false
    //     console.error('Error updating product:', err);
    //   });
    // }
    // ;
      
      
  }


  close() {
    this.dialogRef.close();
  }

  closePopup(){
    this.showPopup = false;
  }

  
  addSizeControls() {
    this.availableSizes.forEach(() => {
      this.sizes.push(this.fb.control(false));
    });
  }

  get sizes(): FormArray {
    return this.productForm.get('sizes') as FormArray;
  }

  get colors(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  get materials(): FormArray {
    return this.productForm.get('materials') as FormArray;
  }

  removeMaterial(index: number) {
    this.materials.removeAt(index);
  }

  addMaterial() {
    this.materials.push(new FormControl('', Validators.required));
  }

  addColor() {
    this.colors.push(new FormControl('#000000', Validators.required));
  }

  removeColor(index: number) {
    this.colors.removeAt(index);
  }

  onCheckboxChange(event: any, index: number) {
    const sizesArray = this.sizes;
    sizesArray.at(index).setValue(event.target.checked);
  }
}

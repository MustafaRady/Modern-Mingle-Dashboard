import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {

  isLoading: boolean = false;
  constructor(
    private dialogRef:MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private productService:ProductService
  ){}

  onDelete(){
    this.isLoading = true;
    this.productService.deleteImage(this.data.imageUrl)
    this.productService.deleteProduct(this.data).subscribe(
      data=>{
        this.isLoading = false;
        this.dialogRef.close();
      },error=>{
        this.isLoading=false;
        console.log(error)
      }
    )
  }

  onClose(){
    this.dialogRef.close()
  }
}

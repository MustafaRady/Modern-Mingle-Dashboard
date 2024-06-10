import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../../components/add-product/add-product.component';
import { EditProductComponent } from '../../components/edit-product/edit-product.component';
import { DeleteProductComponent } from '../../components/delete-product/delete-product.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  isLoading:boolean=false;
  products:Product[] = [];
  dataSource:any ;
  displayedColumns: string[] = ['brand', 'category', 'colors', 'description', 'id', 'imageUrl', 'inStock', 'materials', 'name', 'price', 'rating', 'sizes', 'subDescription', 'actions'];
  columnHeaders:string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(
    private productService:ProductService,
    private dialog:MatDialog
  ){
    this.isLoading=true;
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts().subscribe(
      data=>{
          this.products=data
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator=this.paginator
          this.displayedColumns.forEach(product=>{
              let name = product.replace(product.charAt(0),product.charAt(0).toUpperCase())
              this.columnHeaders.push(name)
        })
        this.columnHeaders.push('Actions')
        this.isLoading=false;
        
      },error=>{
        this.isLoading = false;
        console.log(error)
      }
    )
  }

  onDelete(element:Product){
    const dialogRef = this.dialog.open(DeleteProductComponent,{
      width:'500px',
      height:'300px',
      data:element,
    })

    dialogRef.afterClosed().subscribe(data=>{
      console.log("closed")
      this.loadProducts()
    })
  }

  onEdit(element:Product){
    this.dialog.open(EditProductComponent, {
      width: '600px',
      height: '600px',
      data: element
    }
    )
  }

  onAdd(){
    this.dialog.open(AddProductComponent,{
      width:'600px',
      height:'600px'
    })
  }

  columnStyles: { [key: string]: any } = {
    description: { 
        width: '400px',
      },
    
    // id: { 
    //   width: '50px',
    
    // },
    name: { width: '200px' },
    // description: { 
    //   width: '400px',
    // },
    // actions: { 
    //   width: '200px',
    // },
    // subDescription: {
    //   width: '200px',
    // },
    // brand: {
    //   width: '200px',
    // },
    
    // Add more styles as needed
  };

  filterChange(data:Event){
    const value=(data.target as HTMLInputElement).value
    this.dataSource.filter=value;
  }
}

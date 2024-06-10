import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Product } from '../../model/product';

export function createProductForm(fb: FormBuilder, product?: Product): FormGroup {
  return fb.group({
    name: new FormControl(product ? product.name : '', Validators.required),
    price: new FormControl(product ? product.price : 0, [Validators.required, Validators.min(0)]),
    description: new FormControl(product ? product.description : '', Validators.required),
    subDescription: new FormControl(product ? product.subDescription : '', Validators.required),
    category: new FormControl(product ? product.category : '', Validators.required),
    sizes: fb.array(product ? product.sizes : [], Validators.required),
    colors: fb.array(product ? product.colors : [], Validators.required),
    materials: fb.array(product ? product.materials : [], Validators.required),
    brand: new FormControl(product ? product.brand : '', Validators.required),
    inStock: new FormControl(product ? product.inStock : false, [Validators.required, Validators.min(0)]),
    rating: new FormControl(product ? product.rating : 0, [Validators.required, Validators.min(1), Validators.max(5)]),
    image: new FormControl(product ? product.imageUrl : null, Validators.required)
  });
}

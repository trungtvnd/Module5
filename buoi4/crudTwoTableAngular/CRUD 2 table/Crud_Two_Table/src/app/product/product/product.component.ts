import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductServiceService} from "../../service/product-service.service";
import {CategoryServiceService} from "../../service/category-service.service";
import {Product} from "../../model/product";
import {Category} from "../../model/category";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public formProduct !: FormGroup;


  public products!:Product[];
  public product!:Product;

  public categories!:Category[];



  constructor(private formBuilder: FormBuilder,
              private productService:ProductServiceService,
              private categoryService:CategoryServiceService) { }

  ngOnInit(): void {
    this.formProduct = this.formBuilder.group({
      id:[''],
      name : [''],
      price: [''],
      quantity:[''],
      description: [''],
      category : [''],
    })
    this.getAllCategory();
    this.getAllProduct();
  }

  public getAllCategory(){
    this.categoryService.getAllCategory().subscribe(data =>{
      this.categories = data
    })
  }

  public getAllProduct(){
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
    })
    this.formProduct.reset();
    // @ts-ignore
    document.getElementById(`submit`).innerHTML = 'Create';
    // @ts-ignore
    document.getElementById('title').innerText = 'Create New product';

  }

  public createProduct(){
    const product = {
      id:this.formProduct.value.id,
      name: this.formProduct.value.name,
      price: this.formProduct.value.price,
      quantity: this.formProduct.value.quantity,
      description: this.formProduct.value.description,
      category: {id: this.formProduct.value.category},
    };
    this.productService.createProduct(product).subscribe(() => {
      alert('Create Successfully');
      console.log(product)
      this.formProduct.reset();
      this.getAllProduct();
    });

  }

  public editProduct(id:any){
    this.productService.getProductById(id).subscribe((data) => this.formProduct.patchValue(data));
    // @ts-ignore
    document.getElementById('submit').innerText = 'Update';
    // @ts-ignore
    document.getElementById('title').innerText = 'Update product';
  }



  public getProduct(id:any){
    this.productService.getProductById(id).subscribe((data) => {
      this.products = [];
      this.products.push(data);
    });

  }

  public deleteProduct(id:any){
    if (confirm('Are you sure delete product: ' + '?')) {
      this.productService.deleteProduct(id).subscribe(() => {
          alert('Delete Successfully!');
          this.getAllProduct();
        }
      );
    }
  }
}

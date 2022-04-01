import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  public formEditProduct = this.formBuilder.group({
    id: [''],
    name: [''],
    price: [''],
    description: ['']
  })

  constructor(private productService: ProductService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(){
    this.products = this.productService.getAll();
  }



  public editProduct(id:any){
    const product = this.productService.findProductById(id);

    this.formEditProduct.reset();
  }

}

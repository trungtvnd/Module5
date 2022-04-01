import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  public formCreateProduct = this.formBuilder.group({
    id: [''],
    name: [''],
    price: [''],
    description: ['']
  })

  constructor(private formBuilder: FormBuilder, private productService:ProductService) { }

  ngOnInit(): void {
  }


  public submitCreateProduct(){
    const product = this.formCreateProduct.value;
    this.productService.saveProduct(product);
    this.formCreateProduct.reset();
  }

}

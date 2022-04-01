import {Component, Inject, OnInit} from '@angular/core';
import {CategoryServiceService} from "../service/product/category-service.service";
import {Category} from "../model/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductServiceService} from "../service/product/product-service.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  public categories!:Category[];
  public description = ['New', 'Like New 98%', 'Old']

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id:['', [Validators.required]],
      name : ['',[Validators.required]],
      price: ['',[Validators.required]],
      quantity:['', [Validators.required]],
      description: ['', [Validators.required]],
      category : ['', [Validators.required] ],
    })
    this.getAllCategory()

    if(this.editData){
      this.productForm.controls['id'].setValue(this.editData.id);
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
      this.productForm.controls['category'].setValue(this.editData.category.id);
      this.productForm.controls['description'].setValue(this.editData.description);
    }

  }

  constructor(private categoryService:CategoryServiceService,
              private formBuilder:FormBuilder,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private productService:ProductServiceService,
              private matDialogRef: MatDialogRef<DialogComponent>) {
  }

  public getAllCategory(){
    this.categoryService.getAllCategory().subscribe(data =>{
      this.categories = data
    })
  }


  public createProduct() {
     const product = {
       id: this.productForm.value.id,
       name: this.productForm.value.name,
       price: this.productForm.value.price,
       quantity: this.productForm.value.quantity,
       description: this.productForm.value.description,
       category: {id: this.productForm.value.category},
     };
     this.productService.createProduct(product).subscribe(() => {
       alert('Create Successfully');
       console.log(product)
       this.productForm.reset();
       this.matDialogRef.close();
     });

  }

  public updateProduct(){
    this.productService.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          console.log(res)
          alert('Update Successfully');
          this.productForm.reset();
          this.matDialogRef.close('update')
        }, error:()=>{
          alert("error while update")
        }
      })

  }

}

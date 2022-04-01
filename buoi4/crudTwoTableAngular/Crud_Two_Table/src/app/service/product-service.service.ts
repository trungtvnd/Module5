import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private httpOption = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private httpClient:HttpClient) { }

  public getAllProduct():Observable<Product[]> {

    return this.httpClient.get<Product[]>(API_URL + '/api/products', this.httpOption)
  }

  getProductById(id:any):Observable<Product>{
    return this.httpClient.get<Product>(API_URL + '/api/products/' + id, this.httpOption          )
  }

  createProduct(product:Product):Observable<Product>{
    return this.httpClient.post(API_URL + '/api/products', product)
  }

  deleteProduct(id:any):Observable<Product>{
    return this.httpClient.delete(API_URL + '/api/products/' + id )
  }

}

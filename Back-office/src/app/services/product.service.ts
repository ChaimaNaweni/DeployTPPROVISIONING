import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { Product } from '../models/entity/product';

@Injectable({
  providedIn: 'root'
})

/*************************
 * 
 * @author Tarchoun Abir
 * 
 *************/
export class ProductService {

  //api backend
  private base_url = environment.publicApi + '/Products';
  idIfEdit: any = null;
  constructor(private http: HttpClient) { }

  //http opttion
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'

    })
  }
  //handel api  errors 
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //a client-side or a neetwork error occurend .Handel it accordingly
      console.error('An Error occurend', error.error.message)

    }
    else {
      // the backend may returned an successfully response code 
      // the response body may contain clues as to what went wrong 
      console.error(`backend returned code ${error.status}, ` +
        `body was : ${error.error}`
      );
    }
    // return an observabel with a user-facing error message 
    return throwError('something bad happined , please try again later .');
  };


  //get all Products 
  getallProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base_url + '/GetAllProducts');
  }

  // update 
  updateProduct(item: Product) {
    return this.http.put<Product>(this.base_url + '/UpdateProduct/'  + item.productId,item, this.httpOptions);

  }
   
  // get  by id
  getProductByid(id: number) {
    return this.http.get<Product>(this.base_url + '/' + id);

  }

  //add product
  addProduct(bodyReques:any):any{
  
    return this.http.post<any>(this.base_url + '/addNewProduct',bodyReques);
  }


  // delete
  deleteProduct(id: number) {
    return this.http.delete<Product>(this.base_url + '/DeleteProduct/' + id);

  }


  //upload file product
uploadProductImage(/*nameImage:any*/file:any):any{
  const formData: FormData = new FormData();
  formData.append('file', file);
  return this.http.post<any>(environment.publicApi + '/FileUpload' ,formData);
}


  // get Access 
  getAccess(): any {
    return this.http.get<any>(environment.publicApi  + '/Access/GetAllAccess');
  }


  // Get users 
  getUser(): any {
    return this.http.get<any>(environment.publicApi + '/Users/GetAllUser');
  }


  //patchValue for update 
  populateForm(product: any) {
    console.log('populateForm==============>', JSON.stringify(product));
    this.form.patchValue(product);

  }


  //validation formulaire
  form: FormGroup = new FormGroup({
    productId: new FormControl(),
    description: new FormControl(''),
    productStatus: new FormControl(''),
    publishDate: new FormControl(''),
    productName: new FormControl(''),
    productVersion: new FormControl(''),
    createdDate: new FormControl(''),
    lastModificatedDate: new FormControl(''),
    LogoFilePath: new FormControl(''),


  });

  // inialisation formulaire 
  initializeFormGroup() {
    this.form.setValue({
      productId: '',
      description: '',
      productName: '',
      productVersion: '',
      productStatus:false,
      publishDate: '',
      createdDate: '',
      lastModificatedDate: new Date(),
      LogoFilePath: '',

    });
  }


}


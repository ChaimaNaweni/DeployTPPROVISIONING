import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { AddProductsComponent } from '../add-products/add-products.component';
import { Product } from 'src/app/models/entity/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  listPrducts: Product[]=[];
  UserProduct: any
  AccessProduct: any;
  imageFile: any;
  typeImage: any;
  isEditeMode = false;
  //selected items 
  userSelected: any;
  accessSelected: any;
  productId: any;
  baseProductPath="../../assets/TPItalia-software/images/product/";
  constructor(private productService: ProductService, private dialog: MatDialog,private _Snackbar: MatSnackBar, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getProducts();
    this.productService.populateForm(this.productId)
  }

  onSelectFile(file: any) {
    this.imageFile = file.target.files[0];
    this.typeImage = file.target.files[0].name.split('.').pop();
    console.log('file.target.files[0] :', file.target.files[0], "file.target.files[0].type :", file.target.files[0].name.split('.').pop());
  }

  getProducts() {
    this.productService.getallProducts().subscribe((res: any) => {
      console.log('result of the product ====================>', res)
      this.listPrducts = res;
      /*console.log('==================>res image',this.listPrducts[0].image);*/
    },
      (err: any) => { console.log('result of the product ====================>', err) })
  }

 


//fo add an produit resize
async addProduct(){
  let imageName=Math.random().toString() //+ ".png";
  let productBody={
  logo:this.baseProductPath + imageName + "." + this.typeImage,
  description:this.productService.form.value.description,
  productStatus:this.productService.form.value.productStatus,
  productName:this.productService.form.value.productNme,
  productVersion:this.productService.form.value.productVersion,
  createdDate:new Date(),
  lastModifiedDate:new Date(),
};


await this.productService.uploadProductImage(imageName).subscribe((res:any)=>{
});

await this.productService.addProduct(productBody).subscribe((res:any)=>{
this.productId=res.id
console.log('idProduct======================>',this.productId)
});

}



  /*************************
   * delete product
   */
  onDeleteProduct(productId: number) {
    Swal.fire({
      title: 'Are you sure to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: 'gray'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(productId)
          .subscribe(
            response => {
              console.log(response);

              Swal.fire('Deleted!', ' Deleted successfully.', 'success');
              if (result.dismiss === Swal.DismissReason.cancel) {
              }

              this.getProducts()

            });
        //snackBar success 
        this._Snackbar.open(" Deleted Successfully", + '' + "K" + '' + '⚡', {
          duration: 8000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
          panelClass: ["mat-toolbar", "mat-success"],
        });
      }

    });

  }


  onEditproduct(row: any) {
    console.log('======================id===>',this.productService.form.value.id);
    
    this.productService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height= "80%";
    this.dialog.open(AddProductsComponent, dialogConfig);


  }
    // create dialog config
    onCreateproduct() { 
      this.productService.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.height= "80%";
      this.dialog.open(AddProductsComponent, dialogConfig);
  
    }
  

  onUpdate() {
    this.isEditeMode != this.isEditeMode
    let request = this.productService.form.value;
    request.image = this.productService.form.value.image;
    this.productService.updateProduct(request).subscribe((res) => {
      console.log("====================> updateeeeee test ", res)
      //this.notificationService.success('  ::  ' + ' ' + ' updated successfully ' + '⚡' + 'OK')
      window.location.href = '/admin/products';
    })


  }

  //CKeditor

  config = {
    height: 320,

    image: {
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'
      ],

      // Configure the available image resize options.
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:5',
          label: '5%',
          value: '5'
        },
        {
          name: 'resizeImage:10',
          label: '10%',
          value: '10'
        },
        {
          name: 'resizeImage:25',
          label: '25%',
          value: '25'
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75'
        }
      ],

      // You need to configure the image toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative'
      ]
    },
    language: 'en'
  };





}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScriptLoaderService } from 'src/app/services/loader-script.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
declare var $: any;
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  listPrducts: any;
  UserProduct: any
  AccessProduct: any;
  imageFile: any;
  typeImage: any;
  isEditeMode = false;
  //selected items 
  userSelected: any;
  accessSelected: any;
  productId: any;

  constructor(private _script: ScriptLoaderService, public productService: ProductService, public dialogRef: MatDialogRef<AddProductsComponent>, private _Snackbar: MatSnackBar, private notificationService: NotificationService, private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
    this.getProducts();
    this.productService.populateForm(this.productId)
  }

  onSelectFile(file: any) {

    this.imageFile = file.target.files[0];
    this.typeImage = file.target.files[0].name.split('.').pop();
  }

  getProducts() {
    this.productService.getallProducts().subscribe((res: any) => {
      this.listPrducts = res;
    })
  }

  //fo add an produit resize

  async onSubmit() {


    if (this.productService.form.valid) {
      if (!this.productService.form.value.productId) {
        let imageName = Math.random().toString() //+ ".png";
        const formData: FormData = new FormData();
        formData.append('file', this.imageFile);
        //formData.append('productId', this.productService.form.value.productId);
        this.uploadFileService.uploadFile(formData).subscribe((res: any) => {
          let productBody = {
            LogoFilePath: res,
            description: this.productService.form.value.description,
            productStatus: this.productService.form.value.productStatus,
            productName: this.productService.form.value.productName,
            productVersion: this.productService.form.value.productVersion,
            createdDate: new Date(),
            lastModifiedDate: new Date(),
          };

          this.productService.addProduct(productBody).subscribe((res: any) => {

          });
          window.location.href = "/admin/products"

        },
          ((err: any) => { console.log("err image upload ", err) }))


      }
      // update product file 
      else {


        let request = this.productService.form.value.productId;
        //request.logo=this.productService.form.value.logo;
        this.productService.updateProduct(this.productService.form.value).subscribe((res) => {
          console.log(res)
        },

          (err: any) => { console.log(' errr :: ===============>', err) });
      }

      window.location.href = "/admin/products"
    }

  }
  onClear() {
    this.productService.form.reset();
    this.productService.initializeFormGroup();
  }
  // dialogue close 
  onClose() {
    this.productService.form.reset();
    this.productService.initializeFormGroup();
    this.dialogRef.close();
  }


  //CKeditor

  config = {
    height: 250,

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

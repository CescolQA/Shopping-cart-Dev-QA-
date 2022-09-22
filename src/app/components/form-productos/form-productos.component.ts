import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { Producto } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-form-productos',
  templateUrl: './form-productos.component.html',
  styleUrls: ['./form-productos.component.css']
})
export class FormProductosComponent implements OnInit {

  private path = 'products/'
  cliente: Cliente;
  newFile: any;
  uid = '';
  constructor(public firestoreService: AuthService,
    public router: Router,
    public storageService: StorageService) {
    this.cliente = {
      uid: '',
      email: '',
      nombre: '',
      foto: '',
      referencia: ''
    }


  }

  ngOnInit(): void {
    this.getProductos()
  }

  newImage = ''


  productos: Producto[] = [];
  newProducto: Producto = {
    nombre: '',
    precio: 0,
    description: '',
    foto: '',
    id: this.firestoreService.getId(),
    fecha: new Date,
  }

  async guardarProducto() {
    const path = 'Productos';
    const name = this.newProducto.nombre;
    if (this.newFile !== undefined) {
      const res = await this.storageService.uploadImageService(this.newFile, path, name);
      this.newProducto.foto = res;
    }
    this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id).then(res => {
      console.log(res)
    }).catch(error => {
      console.log('no se puede guardar', error)
    });

    this.router.navigate(['/home'])
  }

  getProductos() {
    this.firestoreService.getCollection<Producto>(this.path).subscribe(res => {
      this.productos = res
    })
  }
  deleteProduct(producto: Producto) {
    this.firestoreService.deleteDoc(this.path, producto.id);
  }

  async uploadImage(event: any) {

    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newProducto.foto = image.target?.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}



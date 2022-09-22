import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoPedido } from 'src/app/models/productoPedido.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  uid = ''


  private path = 'products/'
  public productos: Producto[] = [];
  producto: Producto
  productoPedido: ProductoPedido

  constructor(public authService: AuthService,
    public carritoService: CarritoService) {
    this.loadProductos();
    this.producto = {
      nombre: 'string',
      precio: 0,
      description: '',
      foto: '',
      id: '',
      fecha: new Date(),
    };

    this.productoPedido = {
      producto: this.producto,
      cantidad: 0
    }

  }

  ngOnInit(): void {
  }

  loadProductos() {
    this.authService.getCollection<Producto>(this.path).subscribe(res => {
      this.productos = res
    })
  }

  getUserInfo(uid: string) {
    const path = 'Clientes';
    this.authService.getDoc<Producto>(path, uid).subscribe(res => {
      res = this.producto
    })
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ProductoPedido } from 'src/app/models/productoPedido.model';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-itemcart',
  templateUrl: './itemcart.component.html',
  styleUrls: ['./itemcart.component.css']
})
export class ItemcartComponent implements OnInit {


  producto: Producto
  ngOnInit(): void {
  }


  @Input() productoPedido: ProductoPedido;
  @Input() botones = true;

  constructor(public carritoService: CarritoService) {

    this.producto = {
      nombre: '',
      precio: 0,
      description: '',
      foto: '',
      id: '',
      fecha: new Date(),
    }

    this.productoPedido = {
      producto: this.producto,
      cantidad: 0
    }
  }

  addCarrito() {
    this.carritoService.addProducto(this.productoPedido.producto);
  }

  removeCarrito() {
    this.carritoService.removeProducto(this.productoPedido.producto);
  }

}

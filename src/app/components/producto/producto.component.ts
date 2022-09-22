import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/models/producto.model';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @Input() producto: Producto;

  message = 'Añadido';
  action = 'con exito'
  constructor(public carritoService: CarritoService,
    public snackBar: MatSnackBar) {
    this.producto = {
      nombre: 'string',
      precio: 0,
      description: '',
      foto: '',
      id: '',
      fecha: new Date(),
    };
  }

  ngOnInit(): void {
  }

  addCarrito() {
    this.carritoService.addProducto(this.producto);
    this.openSnackBar(this.message, this.action)
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}

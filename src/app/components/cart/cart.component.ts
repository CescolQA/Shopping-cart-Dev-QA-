import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';
import { Pedido } from 'src/app/models/pedido.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  agrega = ''

  pedido: Pedido;
  cliente: Cliente;
  carritoSuscriber: Subscription;

  total: number;
  cantidad: number;

  message = 'Pedido creado';
  action = 'con exito!!'

  constructor(public authService: AuthService,
    public carritoService: CarritoService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {
    this.carritoSuscriber = new Subscription

    this.loadPedido();
    this.initCarrito();

    this.total = 0
    this.cantidad = 0

    this.cliente = {
      uid: '',
      email: '',
      nombre: '',
      foto: '',
      referencia: ''
    }

    this.pedido = {
      uid: '',
      cliente: this.cliente,
      productos: [],
      precioTotal: 0,
      estado: 'enviado',
      fecha: new Date(),
      valoracion: 0
    };
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.carritoSuscriber) {
      this.carritoSuscriber.unsubscribe();
    }
  }




  loadPedido() {
    this.carritoSuscriber = this.carritoService.getCarrito().subscribe(res => {
      this.pedido = res;
      this.getCantidad();
      this.getTotal()
    })
  }

  initCarrito() {
    this.pedido
  }



  getTotal() {
    this.total = 0
    this.pedido.productos.forEach(producto => {
      this.total = (producto.producto.precio) * producto.cantidad + this.total;
    });
  }

  getCantidad() {
    this.cantidad = 0
    this.pedido.productos.forEach(producto => {
      this.cantidad = producto.cantidad + this.cantidad;
    });
  }

  async pedir() {
    if (!this.pedido.productos.length) {
      console.log('añade items al carrito');
      this.agrega = 'Añade items al carrito'
      return;
    }
    this.pedido.fecha = new Date();
    this.pedido.precioTotal = this.total;
    this.pedido.uid = this.authService.getId();
    const uid = await this.authService.getUid()
    const path = 'Clientes/' + uid + '/pedidos/'
    
    this.authService.createDoc(this.pedido, path, this.pedido.uid).then(() => {
      
      this.carritoService.clearCarrito();
    });

    this.openSnackBar(this.message, this.action)

    setTimeout(() => {
      this.router.navigate(['/mis-pedidos'])
    }, 1500);

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }


}

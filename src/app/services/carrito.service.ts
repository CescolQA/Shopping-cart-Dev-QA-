import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'

import { Pedido } from '../models/pedido.model';
import { Cliente } from '../models/cliente.model';
import { Producto } from '../models/producto.model';
import { ProductoPedido } from '../models/productoPedido.model';
import { Observable, Subject, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private pedido: Pedido;
  res = []
  pedido$ = new Subject<Pedido>();
  path = 'carrito/';
  uid = '';
  cliente: Cliente;


  carritoSubscribe: Subscription = new Subscription;
  clienteSubscriber: Subscription = new Subscription;


  constructor(
    public authService: AuthService,
    public router: Router) {
    this.initCarrito();
    this.authService.stateAuth().subscribe(res => {

      if (res !== null) {
        this.uid = res.uid;

        this.loadCliente();
      }

    });


    this.cliente = {
      uid: '',
      email: '',
      nombre: '',
      foto: '',
      referencia: ''
    }



    this.pedido = {
      uid: this.uid,
      cliente: this.cliente,
      productos: [],
      precioTotal: 0,
      estado: 'enviado',
      fecha: new Date(),
      valoracion: 0,
    }


  }





  loadCliente() {
    const path = 'Clientes';
    this.clienteSubscriber = this.authService.getDoc<Cliente>(path, this.uid).subscribe(res => {
      res = this.cliente;
      this.loadCarrito();
      this.clienteSubscriber.unsubscribe();

    })
  }

  loadCarrito() {
    const path = 'Clientes/' + this.uid + '/' + 'carrito';
    if (this.carritoSubscribe) {
      this.carritoSubscribe.unsubscribe()
    }
    this.carritoSubscribe = this.authService.getDoc<Pedido>(path, this.uid).subscribe(res => {


      if (res) {
        (this.pedido as unknown) = res;
        this.pedido$.next(this.pedido);
      } else {
        this.initCarrito();
      }
    });
  }

  initCarrito() {
    this.pedido = {
      uid: this.uid,
      cliente: this.cliente,
      productos: [],
      precioTotal: 0,
      estado: 'enviado',
      fecha: new Date(),
      valoracion: 0,
    };
    this.pedido$.next(this.pedido);
  }

  getCarrito(): Observable<Pedido> {
    setTimeout(() => {
      this.pedido$.next(this.pedido);
    }, 100);
    return this.pedido$.asObservable()
  }

  addProducto(producto: Producto) {
    if (this.uid.length) {
      const item = this.pedido.productos.find(productoPedido => {
        return (productoPedido.producto.id === producto.id)
      });
      if (item !== undefined) {
        item.cantidad++;
      } else {
        const add: ProductoPedido = {
          cantidad: 1,
          producto,
        };
        this.pedido.productos.push(add);
      }
    } else {
      this.router.navigate(['/login']);
      return
    }
    this.pedido$.next(this.pedido);
    const path = 'Clientes/' + this.uid + '/' + this.path;
    this.authService.createDoc(this.pedido, path, this.uid).then(() => {
    })
  }

  removeProducto(producto: Producto) {
    if (this.uid.length) {
      let position = 0;
      const item = this.pedido.productos.find((productoPedido, index) => {
        position = index;
        return (productoPedido.producto.id === producto.id)
      });
      if (item !== undefined) {
        item.cantidad--;
        if (item.cantidad === 0) {
          this.pedido.productos.splice(position, 1);
        }
        const path = 'Clientes/' + this.uid + '/' + this.path;
        this.authService.createDoc(this.pedido, path, this.uid).then(() => {
        });
      }
    }
  }


  clearCarrito() {
    const path = 'Clientes/' + this.uid + '/' + 'carrito';
    this.authService.deleteDoc(path, this.uid).then(() => {
      this.initCarrito();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido } from 'src/app/models/pedido.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  nuevosSuscriber: Subscription;
  culmidadosSuscriber: Subscription;
  pedidos: Pedido[] = [];

  constructor(public authService: AuthService) {
    this.nuevosSuscriber = new Subscription;
    this.culmidadosSuscriber = new Subscription;
  }


  ngOnInit() {
    this.getPedidosNuevos();
  }

  ngOnDestroy() {
    if (this.nuevosSuscriber) {
      this.nuevosSuscriber.unsubscribe();
    }
    if (this.culmidadosSuscriber) {
      this.culmidadosSuscriber.unsubscribe();
    }
  }



  changeSegment(ev: any) {
    const opc = ev.detail.value;
    console.log(ev.detail.value)
    if (opc === 'culminados') {
      this.getPedidosCulminados();
    }
    if (opc === 'nuevos') {
      this.getPedidosNuevos();
    }
  }

  async getPedidosNuevos() {
    const uid = await this.authService.getUid();
    const path = 'Clientes/' + uid + '/pedidos/';
    this.nuevosSuscriber = this.authService.getCollectionQuery<Pedido>(path, 'estado', '==', 'enviado').subscribe(res => {
      if (res.length) {
    
        this.pedidos = res;
      }
    });

  }

  async getPedidosCulminados() {
    console.log('getPedidosCulminados()');
    const uid = await this.authService.getUid();
    const path = 'Clientes/' + uid + '/pedidos/';
    this.culmidadosSuscriber = this.authService.getCollectionQuery<Pedido>(path, 'estado', '==', 'entregado').subscribe(res => {
      if (res.length) {
        console.log('getPedidosCulminados() -> res ', res);
        this.pedidos = res;
      }
    });

  }
}

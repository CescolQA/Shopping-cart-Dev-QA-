import { Cliente } from "./cliente.model";
import { EstadoPedido } from "./producto.model";
import { ProductoPedido } from "./productoPedido.model";

export interface Pedido {
    uid: string;
    cliente: Cliente;
    productos: ProductoPedido[];
    precioTotal: number;
    estado: EstadoPedido;
    fecha: any;
    valoracion: number;
}

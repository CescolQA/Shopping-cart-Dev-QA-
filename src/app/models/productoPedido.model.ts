import { Producto } from "./producto.model";

export interface ProductoPedido {
    producto: Producto;
    cantidad: number;
}
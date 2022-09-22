export interface Producto {
    nombre: string;
    precio: number;
    description: string;
    foto: string;
    id: string;
    fecha: Date;
}





export type EstadoPedido = 'enviado' | 'visto' | 'camino' | 'entregado';
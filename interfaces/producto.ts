
export interface Producto {
    id_producto: number;
    nombre: string;
    descripcion?: string | null; // Campo opcional o puede ser null
    precio: number;
    precio_descuento:number;
    stock: number;
    imagen_url?: string | null;  // Campo opcional o puede ser null
    id_categoria: number;
    // categoria?: Categoria;       // Puede incluir un objeto `Categoria`
    // detallesPedido?: DetallesPedido[]; // Puede incluir una lista de `DetallesPedido`
  }
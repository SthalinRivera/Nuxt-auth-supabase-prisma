
export interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion?: string | null; // Campo opcional o puede ser null

    // categoria?: Categoria;       // Puede incluir un objeto `Categoria`
    // detallesPedido?: DetallesPedido[]; // Puede incluir una lista de `DetallesPedido`
  }
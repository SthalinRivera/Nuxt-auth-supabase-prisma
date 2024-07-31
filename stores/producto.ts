import type { Producto } from "~/interfaces/producto";

export const useProductosStore = defineStore("productos", () => {
    const carrito = ref<Producto[]>([]);
    const agregarProductoCarrito = (producto: Producto) => {
        const carritoFiltrados = carrito.value.some((v) => v.id_producto === producto.id_producto);
        if (!carritoFiltrados) {
            carrito.value.push(producto);
        }
    }
    const eliminarProductoCarrito = (id: number) => {
        const carritoFiltrados = carrito.value.filter((v) => v.id_producto !== id);
        carrito.value = carritoFiltrados;
    }
    const totalProductoAgregafoCarrito = computed(() => carrito.value.length);
    return { agregarProductoCarrito, eliminarProductoCarrito, carrito, totalProductoAgregafoCarrito }
}
    ,
    {
        persist: {
            storage: persistedState.localStorage,
        }
    })
<template>
    <div>
        <Carrito />
        <div id="" class="flex items-center w-full">
            <div class="flex lg:justify-start justify-between gap-10  w-full px-3 py-5 mx-auto">
                <div class="flex items-center">
                    <NuxtLink to="/" class="">
                        <img src="/img/applepay.png"> EXPRESS
                    </NuxtLink>
                </div>

                <form class="mx-auto w-full px-4" @submit.prevent="searchProducts">
                    <div class="relative flex items-center">
                        <!-- Botón del Dropdown -->
                        <button id="dropdown-button" @click="toggleDropdown"
                            class="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                            type="button">
                            Categorías
                            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <!-- Dropdown -->
                        <div id="dropdown" v-show="isDropdownOpen"
                            class="absolute top-full left-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li v-for="categoria in categorias" :key="categoria.id_categoria">
                                    <button type="button" @click="selectCategoria(categoria.id_categoria)"
                                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        {{ categoria.nombre }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <!-- Input de búsqueda -->
                        <div class="relative w-full ">
                            <input v-model="searchTerm" type="search" id="search-dropdown"
                                class="block py-2.5 px-2 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                placeholder="Search products..." required />
                            <button type="submit"
                                class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>
                <NuxtLink to="productos/shoppingcart" class="flex items-center">
                    <button class="relative md:block hidden">
                        <span class="absolute  flex  items-center   justify-center -right-[3px]  top-0  bg-[#FF4646] 
                                h-[17px] min-w-[17px] text-xs text-white px-0.5  rounded-full
                            ">
                            {{totalQuantityComputed }}
                        </span>
                        <div class="min-w-[40px]">
                            <Icon name="ph:shopping-cart-simple-light" size="33" />
                        </div>
                    </button>
                </NuxtLink>
            </div>
        </div>

        <h1 class="text-4xl text-center mb-2">Todas las categorias</h1>
        <!-- Categorías -->
        <div class="flex flex-wrap justify-center">
            <div class="m-4" v-for="categoria in categorias" :key="categoria.id_categoria">
                <div class="relative grid h-[5rem] w-full max-w-[10rem] flex-col items-center justify-center overflow-hidden rounded-xl bg-clip-border text-center text-gray-700 cursor-pointer"
                    @click="selectCategoria(categoria.id_categoria)">
                    <div
                        class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg flex items-center justify-center p-4">
                        <p class="text-lg text-white">
                            {{ categoria.nombre }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Productos -->
        <h1 class="text-4xl text-center mb-2">Productos</h1>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center  gap-2">
            <div class="relative flex w-full  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                v-for="producto in productosFiltrados" :key="producto.id_producto">
                <div class="relative mx-4 mt-4 h-48 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img :src="producto.imagen_url ?? 'default-image-url.jpg'" class="h-full w-full object-cover" />
                </div>
                <div class="p-6">
                    <div class="mb-2 flex items-center justify-between">
                        <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {{ producto.nombre }}
                        </p>
                    </div>
                    <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        <span class="text-xl font-bold text-slate-900">S/. {{ producto.precio_descuento }}</span>
                        <span class="text-sm text-slate-900 line-through">S/.{{ producto.precio }}</span>
                    </p>
                </div>
                <div class="flex p-6 pt-0 justify-between">
                    <NuxtLink :to="{ name: 'productos-id', params: { id: producto.id_producto.toString() } }">
                        <UButton
                            class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            <template #trailing>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </template>
                        </UButton>
                    </NuxtLink>
                    <UButton @click="favortitos(producto)"
                        class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import type { Producto } from '~/interfaces/producto';
import type { Categoria } from '~/interfaces/categoria';
import { useProductosStore } from '~/stores/producto';
import { storeToRefs } from 'pinia';

const productoStore = useProductosStore();
const { totalProductoAgregafoCarrito } = storeToRefs(productoStore);

const totalQuantityComputed = computed(() => totalProductoAgregafoCarrito.value);

const { $toast } = useNuxtApp()
const { agregarProductoCarrito } = useProductosStore();
const favortitos = (producto: Producto) => {
    agregarProductoCarrito(producto);
    $toast.success("Producto agregado a favoritos");
}

// Estado para productos, categorías, categoría seleccionada y término de búsqueda
const productos = ref<Producto[]>([]);
const categorias = ref<Categoria[]>([]);
const selectedCategoria = ref<number | null>(null);
const searchTerm = ref('');
const isDropdownOpen = ref(false);

// Computed para productos filtrados
const productosFiltrados = computed(() => {
    if (!searchTerm.value.trim()) {
        return productos.value;
    }
    return productos.value.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

// Función para obtener datos iniciales
const fetchInitialData = async () => {
    try {
        const [productosData, categoriasData] = await Promise.all([
            $fetch('/api/v1/productos'),
            $fetch('/api/v1/categoriaProducto')
        ]);
        productos.value = productosData || [];
        categorias.value = categoriasData || [];
    } catch (error) {
        console.error('Error fetching initial data:', error);
    }
};

// Función para obtener productos por categoría
const fetchProductosPorCategoria = async (categoriaId: number) => {
    try {
        const response = await $fetch(`/api/v1/productos/categoria/${categoriaId}`);
        productos.value = Array.isArray(response) ? response : [];
    } catch (error) {
        console.error('Error fetching products by category:', error);
    }
};

// Función para alternar la visibilidad del dropdown
const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// Manejo de cambios en la categoría seleccionada
watch(selectedCategoria, (newCategoriaId) => {
    if (newCategoriaId !== null) {
        fetchProductosPorCategoria(newCategoriaId);
    } else {
        fetchInitialData(); // Mostrar todos los productos si no hay categoría seleccionada
    }
    isDropdownOpen.value = false; // Cerrar el dropdown después de seleccionar una categoría
});

// Función de búsqueda de productos
const searchProducts = () => {
    console.log('Searching products with term:', searchTerm.value);
    // No es necesario actualizar productosFiltrados aquí
    // productosFiltrados es una propiedad computada que se actualiza automáticamente
};

// Función para seleccionar categoría
const selectCategoria = (categoriaId: number) => {
    console.log(`Selected category ID: ${categoriaId}`);
    selectedCategoria.value = categoriaId;
};




// Escuchar clics fuera del dropdown para cerrarlo
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('#dropdown-button') && !target.closest('#dropdown')) {
        isDropdownOpen.value = false;
    }
};

// Registrar y limpiar el evento de clic fuera del componente
onMounted(() => {
    console.log('Component mounted');
    fetchInitialData();
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

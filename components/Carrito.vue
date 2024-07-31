<!-- components/CartSummary.vue -->

<template>
    <NuxtLink to="productos/shoppingcart" class="flex items-center">
        <section class="fixed inset-x-0 bottom-2  flex justify-center z-10 " v-if="shouldShowCart">
            <div class="h-full">
                <!-- Card -->
                <div
                    class="max-w-2xl mx-auto bg-indigo-600 shadow-lg rounded-lg flex items-center p-4 transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-indigo-500">

                    <div class="flex items-center w-full">
                        <!-- Icono principal -->
                        <div class="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                        </div>

                        <!-- Texto -->
                        <div class="flex-grow px-4">
                            <p class="text-lg leading-snug text-gray-50 truncate mb-1">
                                {{ totalQuantityComputed }} Item
                            </p>
                        </div>

                        <!-- Icono de ver carrito -->
                        <div class="flex-shrink-0 flex items-center space-x-3">
                            <p class="text-lg leading-snug text-gray-50 truncate mb-1">
                                Ver carrito
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLink>
</template>



<script setup lang="ts">
import { computed } from 'vue';
import { useProductosStore } from '~/stores/producto';
import { storeToRefs } from 'pinia';

const productoStore = useProductosStore();
const { totalProductoAgregafoCarrito } = storeToRefs(productoStore);

const totalQuantityComputed = computed(() => totalProductoAgregafoCarrito.value);
// Computed para determinar si se debe mostrar el carrito
const shouldShowCart = computed(() => totalQuantityComputed.value > 0);
</script>

<style scoped>
/* Puedes agregar estilos específicos aquí si lo deseas */
</style>
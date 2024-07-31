<template>
    <div>
        <!-- Cart Header -->
        <div class="mx-auto px-2 sm:px-6 lg:px-8">
            <div class="flex items-center justify-center">
                <h1 class="text-2xl font-semibold text-gray-300">Your Cart</h1>
            </div>
        </div>

        <!-- Cart Items -->
        <div class="mt-2 md:mt-12">
            <div class="flex rounded-3xl bg-white shadow-lg">
                <div class="px-4 py-2 sm:px-8 sm:py-10 mx-auto max-w-md">
                    <div class="flow-root">
                        <ul class="-my-8">
                            <li v-for="producto in carrito" :key="producto.id_producto"
                                class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                <div class="shrink-0 relative">
                                    <span
                                        class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </span>
                                    <img class="h-24 w-24 max-w-full rounded-lg object-cover"
                                        :src="producto.imagen_url ?? 'default-image-url.jpg'" alt="" />
                                </div>

                                <div class="relative flex flex-1 flex-col justify-between">
                                    <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                        <div class="pr-8 sm:pr-5">
                                            <p class="text-base font-semibold text-gray-900">{{ producto.nombre }}</p>
                                        </div>
                                        <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                            <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                                S/. {{ producto.precio_descuento }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                        <button type="button" @click="removeFavorito(producto.id_producto)"
                                            class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Cart Summary -->
                <div class="px-4 py-6 sm:px-8 sm:py-10 mx-auto max-w-md">
                    <div class="mt-6 space-y-3 border-t border-b py-8">
                        <div class="flex items-center justify-between">
                            <p class="text-gray-400">Subtotal</p>
                            <p class="text-lg font-semibold text-gray-900">/S. {{ totalPriceComputed.toFixed(2) }}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <p class="text-gray-400">Envío</p>
                            <p class="text-lg font-semibold text-gray-900">/S. 0.00</p>
                        </div>
                    </div>
                    <div class="mt-6 flex items-center justify-between">
                        <p class="text-sm font-medium text-gray-900">Total</p>
                        <p class="text-2xl font-semibold text-gray-900">
                            <span class="text-xs font-normal text-gray-400">/S.</span> {{ (totalPriceComputed + 0).toFixed(2) }}
                        </p>
                    </div>

                    <div class="mt-6 text-center">
                        <button type="button"
                            class="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                            Place Order
                            <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                    <p class="text-sm text-gray-600">Items in Cart:</p>
                    <p class="text-xl font-bold text-gray-900">{{ totalQuantityComputed }}</p>
                    <!-- Payment Protection -->
                    <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
                        <div class="text-lg font-semibold mb-2">Payment methods</div>
                        <div class="flex items-center justify-start gap-8 my-4">
                            <div v-for="card in cards" :key="card">
                                <img class="h-6" :src="card" />
                            </div>
                        </div>
                        <div class="border-b" />
                        <div class="text-lg font-semibold mb-2 mt-2">Buyer Protection</div>
                        <p class="my-2">
                            Get full refund if the item is not as described or if is not delivered
                        </p>
                    </div>
                </div>
            </div>
        </div>

       
      

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProductosStore } from '~/stores/producto';
import { useCartStore } from '~/stores/cartStore';
import { storeToRefs } from 'pinia';

const cards = ref([
    '/img/visa.png',
    '/img/mastercard.png',
    '/img/paypal.png',
    '/img/applepay.png',
]);

const { $toast } = useNuxtApp();
const productoStore = useProductosStore();
const { carrito } = storeToRefs(productoStore);

const cartStore = useCartStore();
const productQuantities = ref<Record<number, number>>({});

const removeFavorito = (id: number) => {
    productoStore.eliminarProductoCarrito(id);
    delete productQuantities.value[id];
    $toast.error('Video eliminado de favoritos!');
};

const totalPriceComputed = computed(() => {
    const total = carrito.value.reduce((sum, producto) => {
        const quantity = productQuantities.value[producto.id_producto] || 1;
        return sum + (producto.precio_descuento || 0) * quantity;
    }, 0);

    return total;
});

const totalQuantityComputed = computed(() => {
    return carrito.value.reduce((count, producto) => {
        return count + (productQuantities.value[producto.id_producto] || 1);
    }, 0);
});
</script>

<style lang="css" scoped></style>

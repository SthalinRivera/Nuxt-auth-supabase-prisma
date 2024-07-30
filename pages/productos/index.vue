<template>
    <div class="">
        <NuxtLink to="/videos/favoritos">Favoritos</NuxtLink>
        <!-- <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1> -->
        <h1 class="text-4xl text-center mb-2">Productos</h1>
        <!-- component -->
        <div class="grid md:grip-cols-1 sm:grid-cols-4 lg:grip-cols-5 items-center justify-center gap-2">
            <div class="relative flex w-64 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                v-for="producto in productos" :key="producto.id">
                <div class="relative mx-4 mt-4 h-48 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                    <img :src="producto.imagen_url" class="h-full w-full object-cover" />
                </div>
                <div class="p-6">
                    <div class="mb-2 flex items-center justify-between">
                        <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                            {{ producto.nombre }}
                        </p>
                    </div>
                    <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        <span class="text-xl font-bold text-slate-900">S/. {{ producto.precio_descuento }} </span>
                        <span class="text-sm text-slate-900 line-through">S/.{{ producto.precio }} </span>
                    </p>
                </div>
                <div class="p-6 pt-0">
                    <a href="#"
                        class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Añadir al carrito</a>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Producto } from '~/interfaces/producto';
import type { Video } from '~/interfaces/video';
import { useVideoStore } from '~/stores/video';
import formatoData from '~/utils/formatoData';
const { adicionarFavorito } = useVideoStore();
const { data: productos, error } = await useFetch("/api/v1/productos");


//  const productos = ref<Producto[]>([])
//  onMounted(async () => {
//     productos.value = await $fetch("/api/v1/videos")
// })

definePageMeta({
    middleware: ["auth"],
});
onMounted(() => {
    if (error.value) {
        $toast.error(error.value.statusMessage || "");
        // videos.value = await $fetch("/api/v1/videos")
    }

})

const { $toast } = useNuxtApp()
const favortitos = (video: Video) => {
    adicionarFavorito(video);
    $toast.success("Video agregado a favoritos");
}
</script>
<style lang="css" scoped></style>
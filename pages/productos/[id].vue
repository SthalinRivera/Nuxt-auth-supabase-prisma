<template>
    <div>
        <div class="">
            <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1>
            <NuxtLink to="/productos">Regresa productos</NuxtLink>
            <!-- component -->
            <div
                class="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
                <div
                    class="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                    <img :src="producto.imagen_url" class="h-full w-full object-cover" />
                </div>
                <div class="p-6">
                    <h6
                        class="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                        {{ producto.nombre }}
                    </h6>
                    <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        <span class="text-xl font-bold text-slate-900">S/. {{ producto.precio_descuento }} </span>
                        <span class="text-sm text-slate-900 line-through">S/.{{ producto.precio }} </span>
                    </p>
                    <p class="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                        {{ producto.descripcion }}
                    </p>
                    <div class="  p-6 pt-0">
                        <a href="#"
                            class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Agregar al carrito
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Video } from '~/interfaces/video';
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'

//Personalizar layout padre 
// definePageMeta({
//     layout: "exhibicion",
//     middleware: ["video", "auth"],
// })

const isOpen = ref(false)
const route = useRoute();
const { id } = route.params;
// const video = ref<Video>({} as Video);

const { data: producto } = await useFetch(`/api/v1/productos/${id}`)


// onMounted(async () => {
//     video.value = await $fetch(`/api/v1/videos/${route.params.id}`)
//     console.log("aqui se muestra los videos", video);
// })

if (!producto.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Video no encontrado"
    })

}
type Schema = InferType<typeof schema>
const schema = object({
    description: string().required('Required').min(3, 'Must be at least 8 characters'),
    url: string()
        .min(8, 'Must be at least 8 characters')
        .required('Required')
})

const router = useRouter()
const { $toast } = useNuxtApp();
const state = reactive({
    id_producto: 0,
    descripcion: '',
    imagen_url: ''
})



</script>
<style lang="scss" scoped></style>
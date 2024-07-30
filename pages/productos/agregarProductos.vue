<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'
import type { Categoria } from '~/interfaces/categoria';

const router = useRouter()
const { $toast } = useNuxtApp();
const { user } = useUserSession();

type Schema = InferType<typeof schema>
const schema = object({
    nombre: string().required('Required').min(3, 'Must be at least 3 characters'),
    descripcion: string().required('Required').min(3, 'Must be at least 3 characters'),
    imagen_url: string().url().nullable().min(8, 'Must be at least 8 characters').required('Required')
})

const state = reactive({
    nombre: '',
    descripcion: '',
    precio: '',
    precio_descuento: '',
    stock: '',
    imagen_url: '',
    id_categoria: undefined,
    options: [] as { label: string; value: number }[]
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        const payload = {
            nombre: state.nombre,
            descripcion: state.descripcion,
            precio: parseFloat(state.precio),
            precio_descuento: parseFloat(state.precio_descuento),
            stock: parseInt(state.stock, 10),
            imagen_url: state.imagen_url,
            id_categoria: state.id_categoria?.value // Obtener solo el valor del objeto id_categoria
        };

        await $fetch("/api/v1/productos", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        router.push("/productos");
        $toast.success("Producto agregado");
    } catch (error) {
        $toast.error("Error al agregar producto");
    }
    console.log(event.data);
}

const { data: categorias, error } = await useFetch<Categoria[]>("/api/v1/categoriaProducto");
if (error.value) {
    console.error("Error fetching categorias:", error.value);
} else if (categorias.value) {
    state.options = categorias.value.map((categoria: Categoria) => ({
        label: categoria.nombre,
        value: categoria.id_categoria,
    }));
    console.log("Opciones generadas:", state.options);
}
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nombre" name="nombre">
            <UInput v-model="state.nombre" />
        </UFormGroup>
        <UFormGroup label="Descripción" name="descripcion">
            <UInput v-model="state.descripcion" />
        </UFormGroup>
        <UFormGroup label="Precio" name="precio">
            <UInput v-model="state.precio" type="number" />
        </UFormGroup>
        <UFormGroup label="Precio Descuento" name="precio_descuento">
            <UInput v-model="state.precio_descuento" type="number" />
        </UFormGroup>
        <UFormGroup label="Stock" name="stock">
            <UInput v-model="state.stock" type="number" />
        </UFormGroup>
        <UFormGroup label="Imagen" name="imagen_url">
            <UInput v-model="state.imagen_url" type="text" />
        </UFormGroup>
        <UFormGroup name="id_categoria" label="Categoria">
            <!-- Pasar `options` al componente `USelectMenu` -->
            <USelectMenu v-model="state.id_categoria" placeholder="Select..." :options="state.options" />
        </UFormGroup>
        <UButton type="submit">
            Agregar producto
        </UButton>
    </UForm>
</template>

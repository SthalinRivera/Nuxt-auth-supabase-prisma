<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { object, string, type InferType } from 'yup'
const router = useRouter()
const { $toast } = useNuxtApp();
type Schema = InferType<typeof schema>
const schema = object({
    description: string().required('Required').min(3, 'Must be at least 8 characters'),
    url: string().url().nullable()
        .min(8, 'Must be at least 8 characters')
        .required('Required')
})

const state = reactive({
    description: undefined,
    url: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    try {
        await $fetch("/api/v1/videos",
            {
                method: "POST",
                body: state,
            }
        )
        router.push("/videos")
        $toast.success("Video agregado")
    } catch (error) {
        $toast.error("Error al agregar video")
    }
    console.log(event.data)
}
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Descripción" name="description">
            <UInput v-model="state.description" />
        </UFormGroup>
        <UFormGroup label="Url" name="url">
            <UInput v-model="state.url" type="text" />
        </UFormGroup>
        <UButton type="submit">
            add video
        </UButton>
    </UForm>
</template>

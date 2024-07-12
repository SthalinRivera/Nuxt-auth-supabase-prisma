<template>
    <div class="">
        <NuxtLink to="/videos/favoritos">Favoritos</NuxtLink>
        <h1 class="text-4xl text-center mb-2">{{ $t("titulo") }}</h1>
        <div class="grid md:grip-cols-1 sm:grid-cols-2 lg:grip-cols-3 items-center justify-center gap-2">
            <UCard v-for="video in videos" :key="video.id">
                <template #header>
                    {{ video.description }}
                </template>
                <iframe class="h-64 w-full" :src="video.url" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <p v-data-horario="'dd/mm/yyyy'">{{ video.data_potagem }}</p>
                <template #footer>
                    <div class="flex justify-between">
                        <UButton @click="favortitos(video)">Agregar a favoritos</UButton>
                        <NuxtLink :to="{
                            name: 'videos-id',
                            params: { id: video.id.toString() }
                        }">
                            <UButton label="Ver Video" color="gray">
                                <template #trailing>
                                    <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                                </template>
                            </UButton>
                        </NuxtLink>
                    </div>
                </template>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Video } from '~/interfaces/video';
import { useVideoStore } from '~/stores/video';
const videos: Video[] = [
    {
        "id": 1,
        "description": "Example 1",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-05-25"
    },
    {
        "id": 2,
        "description": "Example 2",
        "url": "https://www.youtube.com/embed/yhFU1fvbsWI?si=Acf99JAtXjaI9LRF",
        "data_potagem": "2024-05-26"
    },
    {
        "id": 3,
        "description": "Example 3",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-05-27"
    },
    {
        "id": 4,
        "description": "Example 4",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-05-28"
    },
    {
        "id": 5,
        "description": "Example 5",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-05-29"
    },
    {
        "id": 6,
        "description": "Example 6",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-05-30"
    },
    {
        "id": 7,
        "description": "Example 7",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-05-31"
    },
    {
        "id": 8,
        "description": "Example 8",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-06-01"
    },
    {
        "id": 9,
        "description": "Example 9",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-06-02"
    },
    {
        "id": 10,
        "description": "Example 10",
        "url": "https://www.youtube.com/embed/3J9YB1ph0o0?si=WMpCEl9qDwQZ04wO",
        "data_potagem": "2024-06-03"
    }

]

const { adicionarFavorito } = useVideoStore();
const { $toast } = useNuxtApp()

const favortitos = (video: Video) => {
    adicionarFavorito(video);
    $toast.success("Video agregado a favoritos");
}
</script>
<style lang="css" scoped></style>
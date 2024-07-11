<template>
    <div>
        <h1>numero de videos {{ idParams }}</h1>

        <VideoDetalles />
     
        <VideoControlePlay/>
    </div>
</template>
<script setup>

definePageMeta({
    layout: "exhibicion",
    middleware: ["video","auth"],
})
const route = useRoute();
const idParams = computed(() => route.params.id)

</script>

<style lang="scss" scoped></style>
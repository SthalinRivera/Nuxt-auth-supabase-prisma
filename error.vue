<template>
    <div>
        <h1>{{ error.statusCode }}</h1>
        <p>{{ error.statusMessage }}</p>
    </div>
</template>

<script setup>
defineProps({
    error: {
        default:{
            url:"",
            statusCode:0,
            statusMessage:"",
            message:"",
            description:"",
            data() {
                return {
                    
                }
            },
        }
    },
});
</script>

<style lang="scss" scoped></style>
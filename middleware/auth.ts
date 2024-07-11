const logueado =true;

export default defineNuxtRouteMiddleware((to, from)=>{

    if (to.path !=="/login" && !logueado) {

        return navigateTo("/login")
    }
});
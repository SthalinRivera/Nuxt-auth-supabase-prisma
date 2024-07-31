declare module '#auth-utils'{
    interface User{
        id: number;
        name: string;
        email:string;
        permiso:string;
        urlFoto: string;
        usuarioId : number;
    }
}

import { ToastContainerOptions, toast, type Content } from 'vue3-toastify';

declare module '#app' {
    interface NuxtApp {
        $toast: {
            success: (message: Content) => void;
            error: (message: Content) => void;
            // Puedes agregar más funciones aquí si lo necesitas
        };
    }
}


export {};


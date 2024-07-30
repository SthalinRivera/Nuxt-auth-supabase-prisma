interface Rutas{
    name: string;
    path: string;
    permiso?: string;
}
export default()=>{
    const rutas: Rutas[]=[
        { name:"Home", path:"/" },
        { name:"Videos", path:"/videos" },
        { name:"Agregar videos", path:"/videos/addVideos", permiso:'ADMINISTRADOR' },
        { name:"Favoritos", path:"/videos/favoritos" },   
        { name:"Clientes", path:"/clientes" },   
        { name:"Productos", path:"/productos" },   
        { name:"Agregar Productos", path:"/productos/agregarProductos" },  
    ]
    return rutas;
}
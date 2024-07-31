
import * as videoController from "../controller/video"
import * as productoController from "../controller/producto"
import * as categoriaProductoController from "../controller/categoriaProducto"
const router = createRouter()
router.get('/videos',defineEventHandler(videoController.buscarTodos))
router.get('/productos',defineEventHandler(productoController.buscarTodos))
router.post('/productos',defineEventHandler(productoController.adicionar));
router.get('/productos/:id_producto',defineEventHandler(productoController.buscaPorId));
router.get('/productos/categoria/:id_categoria',defineEventHandler(productoController.buscaPorCategoria));
router.get('/categoriaProducto',defineEventHandler(categoriaProductoController.buscarTodos))



router.get('/videos/:id',defineEventHandler(videoController.buscaPorId));
router.post('/videos',defineEventHandler(videoController.adicionar));
router.put('/videos/:id',defineEventHandler(videoController.actuliazar));
router.delete('/videos/:id',defineEventHandler(videoController.eliminar));
export default useBase("/api/v1/", router.handler)
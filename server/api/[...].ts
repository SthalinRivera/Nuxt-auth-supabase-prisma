
import * as videoController from "../controller/video"
const router = createRouter()
router.get('/videos',defineEventHandler(videoController.buscarTodos))
router.get('/videos/:id',defineEventHandler(videoController.buscaPorId));
router.post('/videos',defineEventHandler(videoController.adicionar));
router.put('/videos/:id',defineEventHandler(videoController.actuliazar));
router.delete('/videos/:id',defineEventHandler(videoController.eliminar));
export default useBase("/api/v1/", router.handler)
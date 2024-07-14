
import * as videoController from "../controller/video"
const router = createRouter()
router.get('/videos',defineEventHandler(videoController.buscaVideos))
router.get('/videos/:id',defineEventHandler(videoController.buscaVideoPorId));
router.post('/videos',defineEventHandler(videoController.adicionaVideo));
router.put('/videos/:id',defineEventHandler(videoController.actuliazaVideo));
router.delete('/videos/:id',defineEventHandler(videoController.eliminarVideos));
export default useBase("/api/v1/", router.handler)
import { Router } from 'express'
import { imagesPost } from '../controllers/upload.controller'
import auth from '../utils/auth'
import { formData } from '../utils/formData'

const router = Router()

router.use(auth)
router.route('/').post(formData, imagesPost)

export default router;

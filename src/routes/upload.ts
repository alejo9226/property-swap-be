import { Router } from 'express'
import { userImagesUpdate, propertyImagesUpdate } from '../controllers/upload.controller'
import auth from '../utils/auth'
import { formData } from '../utils/formData'

const router = Router()

router.use(auth)
router.route('/user').put(formData, userImagesUpdate)
router.route('/property').put(formData, propertyImagesUpdate)

export default router;

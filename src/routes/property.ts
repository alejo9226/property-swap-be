import { Router } from 'express'
import auth from '../utils/auth'
import { addProperty, getProperties } from '../controllers/property.controller'

const router = Router()

router.use(auth)
router.route('/add').post(addProperty)
router.route('/').get(getProperties)

export default router;

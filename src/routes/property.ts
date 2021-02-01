import { Router } from 'express'
import auth from '../utils/auth'
import { addProperty } from '../controllers/property.controller'

const router = Router()

router.use(auth)
router.route('/add').post(addProperty)

export default router;

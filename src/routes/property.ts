import { Router } from 'express'
import auth from '../utils/auth'
import { addProperty, getProperties, getSingleProperty } from '../controllers/property.controller'

const router = Router()

router.use(auth)
router.route('/add').post(addProperty)

router.route('/').get(getProperties)
router.route('/:propertyid').get(getSingleProperty)

export default router;

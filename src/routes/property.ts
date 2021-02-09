import { Router } from 'express'
import auth from '../utils/auth'
import { addProperty, getProperties, getSingleProperty, getOwnProperties } from '../controllers/property.controller'

const router = Router()

router.use(auth)
router.route('/add').post(addProperty)

router.route('/').get(getProperties)
router.route('/own').get(getOwnProperties)
router.route('/:propertyid').get(getSingleProperty)

export default router;

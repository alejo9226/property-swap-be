import { Router } from 'express'
import { addSwap, getProposals, updateSwap } from '../controllers/swap.controller'
import auth from '../utils/auth'

const router = Router()

router.use(auth)
router.route('/add').post(addSwap)
router.route('/:flow').get(getProposals)
router.route('/:swapid/:newstate?').put(updateSwap)

export default router

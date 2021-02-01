import { Router } from 'express'
import { signUp, logIn, getUserInfo } from '../controllers/user.controller'
import auth from '../utils/auth'

const router = Router()

router.route('/signup').post(signUp)
router.route('/login').post(logIn)
router.route('/single').get(auth, getUserInfo)

export default router;

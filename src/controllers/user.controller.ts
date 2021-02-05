import { Request, Response, NextFunction } from 'express'
import User, { IUser } from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


interface TokenData {
  token: string;
  expiresIn: number;
}

interface DataStoredInToken {
  _id: string;
}

function createToken(user: IUser): TokenData {
  const expiresIn = 60 * 60 * 24
  const secret = `${process.env.SECRET}`
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id,
  }
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  }
}

export async function signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { body } = req
    const { password } = body

    const encPassword = await bcrypt.hash(password, 8, undefined)

    const user: IUser = await User.create({ ...body, password: encPassword })

    const token = createToken(user)
    
    res.status(201).json({ token: token.token, message: 'Cuenta creada exitosamente' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
export async function logIn(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { body } = req
    const { email } = body

    const user: IUser = await User.findOne({ email })

    const token = createToken(user)

    res.status(200).json({ token: token.token, message: 'Successfully logged in' })
  } catch (err) {
    res.status(200).json({ message: 'could not log in' })
  }
}

export async function getUserInfo (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user } = req
    const userInfo: IUser = await User.findOne({ _id: user })

    res.status(200).json({ message: 'User found', data: userInfo })
    
  } catch (err) {
    res.status(400).json({ message: 'User not found', data: err.message })
  }
}

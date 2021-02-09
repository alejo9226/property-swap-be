import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

declare module "express-serve-static-core" {
  interface Request {
    user?: string;
  }
}

interface DataStoredInToken {
  _id: string;
}

function auth (req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new Error('Su sesión expiró')

    const [_, token] = authorization.split(' ')
    if (!token) throw new Error('Su sesión expiró')

    const user = jwt.verify(token, `${process.env.SECRET}`) as DataStoredInToken;

    if (typeof user === 'object') {
      req.user = user._id;  
    }

    next();

  } catch (err) {
    console.log(err)
    res.status(401).json({ message: err.message });
  }
}

export default auth;

import { Request, Response, NextFunction } from 'express'


export async function imagesPost(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log('entre a images post')
    res.status(201).json({ message: 'Images uploaded successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
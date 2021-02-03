import { Request, Response, NextFunction } from 'express'
import User, { IUser } from '../models/user.model'
import Property, { IProperty } from '../models/property.model'


export async function userImagesUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, body } = req
    const { file_attachment: { secure_url } } = body
    console.log('entre a images post')
    console.log('req.body', req.body)
    const updatedUser = await User.findOneAndUpdate(
      { _id: user}, { profilePic: secure_url }, { new: true }
    )
    console.log('updatedUser', updatedUser)
    res.status(201).json({ message: 'Images uploaded successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function propertyImagesPost (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, body } = req
    const { file_attachment: { secure_url } } = body

    const property = await Property.create({})
  } catch (err) {

  }
}
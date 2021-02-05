import { Request, Response, NextFunction } from 'express'
import User, { IUser } from '../models/user.model'
import Property, { IProperty } from '../models/property.model'


export async function userImagesUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, body } = req
    const { file_attachment: { secure_url } } = body
    await User.findOneAndUpdate({ _id: user}, 
      { profilePic: secure_url }, { new: true }
    )
    res.status(201).json({ message: 'Images uploaded successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function propertyImagesUpdate (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, body } = req

    const owner = await User.findById({ _id: user })
    const updatedProperty = await Property.findOne({ user: owner._id })

    for (let file in body) {
      if (file.includes('file_attachment')) {
        updatedProperty.pictures.push(body[file].secure_url)
      }
    }

    updatedProperty.save({ validateBeforeSave: false })
    res.status(200).json({ message: 'Pictures added successfully', data: updatedProperty })
  } catch (err) {
    res.status(200).json({ message: 'Pictures not added', data: err.message })
  }
}
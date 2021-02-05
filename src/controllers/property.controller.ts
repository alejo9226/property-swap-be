import { Request, Response, NextFunction } from 'express'
import Property, { IProperty } from '../models/property.model'

export async function addProperty (req: Request, res: Response, next: NextFunction) {
  try {
    const { body, user } = req
    const property: IProperty = await Property.create({...body, user })
    res.status(200).json({ message: 'property created' , data: property })
  } catch (err) {
    res.status(400).json({ message: 'property not created' , data: err.message })

  }
}

export async function getProperties (req: Request, res: Response, next: NextFunction) {
  try {
    const { user } = req
    const properties: IProperty[] = await Property.find({ user: { $ne: user }}).populate('user', 'fullName')
    res.status(200).json({ message: 'Properties found' , data: properties })
  } catch (err) {
    res.status(200).json({ message: 'No properties found' , data: err.message })
  }
}
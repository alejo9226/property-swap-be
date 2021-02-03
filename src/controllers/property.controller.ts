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
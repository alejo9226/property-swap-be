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
    res.status(400).json({ message: 'No properties found' , data: err.message })
  }
}

export async function getOwnProperties (req: Request, res: Response, next: NextFunction) {
  try {
    const { user } = req
    const properties: IProperty[] = await Property.find({ user })
    res.status(200).json({ message: 'Properties found' , data: properties })
  } catch (err) {
    res.status(400).json({ message: 'No properties found' , data: err.message })
  }
}

export async function getSingleProperty (req: Request, res: Response, next: NextFunction) {
  try {
    const { params, user } = req
    const { propertyid } = params
    const property: IProperty = await Property.findOne({ _id: propertyid }).populate('user', 'email profilePic')
    res.status(200).json({ message: 'Property found', data: property })
    
  } catch (err) {
    res.status(400).json({ message: 'Property not found', data: err.message })

  }
}
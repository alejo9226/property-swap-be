import { Request, Response, NextFunction } from 'express'
import swapModel from '../models/swap.model'
import Swap, { ISwap } from '../models/swap.model'

export async function addSwap (req: Request, res: Response, next: NextFunction) {
  try {
    const { body, user } = req
    const swap: ISwap = await Swap.create({ ...body, firstUser: user })
    res.status(200).json({ message: 'Swap created successfully', data: swap })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Swap created successfully', data: err.message })
  }
}

export async function getProposals (req: Request, res: Response, next: NextFunction) {
  try {
    const { user, params } = req
    const { flow } = params

    if (flow !== 'in' && flow !== 'out') throw new Error("Resource not available");

    if (flow === 'in') {
      const swaps: ISwap[] = await Swap.find({ secondUser: user })
      res.status(200).json({ message: 'Swaps retrieved', data: swaps })

    } else if (flow === 'out') {
      const swaps: ISwap[] = await Swap.find({ firstUser: user })
      res.status(200).json({ message: 'Swaps retrieved', data: swaps })

    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Swap created successfully', data: err.message })
  }
}
export async function updateSwap (req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = req
    const { swapid, newstate } = params
    const updatedSwap = await Swap.findOneAndUpdate({ _id: swapid }, { state: newstate }, { new: true })
    console.log('updatedSwap', updatedSwap)
    res.status(200).json({ message: 'Swap updated successfully',  data: updateSwap })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'Swap updated successfully',  data: err.message })
  }
}
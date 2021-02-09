import { model, models, Schema, Document } from 'mongoose'
import { IProperty } from './property.model'
import { IUser } from './user.model'

export interface ISwap extends Document {
  firstUser: IUser['_id'];
  firstProperty: IProperty['_id'];
  secondUser: IUser['_id'];
  secondProperty: IProperty['_id'];
  from: Date;
  to: Date;
  conditions: string;
  state: string;
}

const swapSchema = new Schema({
  firstUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstProperty: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  secondUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  secondProperty: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  conditions: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: 'Plan',
  },
}, {
  timestamps: true,
})


export default model<ISwap>('Swap', swapSchema)
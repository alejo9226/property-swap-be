import { model, Schema, Document } from 'mongoose'
import { IUser } from './user.model'

export interface IProperty extends Document {
  address: string;
  coordinates: string;
  pictures: string[];
  rooms: number;
  user: IUser['_id'];
  stays?: number;
}

const propertySchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: String,
    required: true,
  },
  pictures: {
    type: [{
      type: String
    }]
  },
  rooms: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stays: Number,
}, {
  timestamps: true,
})

export default model<IProperty>('Property', propertySchema)
import { model, Schema, Document } from 'mongoose'
import { IProperty } from './property.model'

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  property?: IProperty['_id'];
}

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }
}, {
  timestamps: true,
})

export default model<IUser>('User', userSchema)
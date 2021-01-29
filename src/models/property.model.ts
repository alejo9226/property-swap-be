import { model, Schema, Document } from 'mongoose'

export interface IProperty extends Document {
  address: string;
  coordinates: string;
  pictures: string[];
  rooms: number;
  stays?: number;
}

const propertySchema = new Schema({
  address: String,
  coordinates: String,
  pictures: {
    type: [{
      type: String
    }]
  },
  rooms: Number,
  stays: Number,
}, {
  timestamps: true,
})

export default model<IProperty>('User', propertySchema)
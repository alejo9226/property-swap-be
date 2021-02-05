import { model, models, Schema, Document } from 'mongoose'
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
      type: String,
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
  stays: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
})

propertySchema.post('save', async function (this: IProperty) {
  const user: IUser = await models.User.findById(this.user)
  user.property = this._id
  user.save({ validateBeforeSave: false })
})


export default model<IProperty>('Property', propertySchema)
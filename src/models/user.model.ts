import { model, models, Schema, Document } from 'mongoose'
import { IProperty } from './property.model'
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

export interface IUser extends Document {
  profilePic: string;
  fullName: string;
  email: string;
  password: string;
  property?: IProperty['_id'];
}

const userSchema = new Schema({
  profilePic: {
    type: String
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      async validator(email: any) {
        try {
          const user = await models.User.findOne({ email });
          return !user;
        } catch (err) {
          return false;
        }
      },
      message: "Email already registered",
    }
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
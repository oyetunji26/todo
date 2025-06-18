import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  image?: string;
}

const UserSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team', default: [] }],
}, { timestamps: true });


const User = mongoose.models?.User || model<IUser>('User', UserSchema);
export default User;
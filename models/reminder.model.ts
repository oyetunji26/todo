import { Schema, model, models } from 'mongoose';

const ReminderSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: 'Task' },
  remindAt: { type: Date, required: true },
  message: String,
}, { timestamps: true });

export default models.Reminder || model('Reminder', ReminderSchema);
import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  progress: { type: Number, min: 1, max: 10, default: 1 },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  reminders: [{ type: Schema.Types.ObjectId, ref: 'Reminder' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  dueDate: Date,
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export default models.Task || model('Task', TaskSchema);

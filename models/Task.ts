import { Schema, model, models } from 'mongoose';

export const TASK_STATUSES = ['todo', 'in_progress', 'done'] as const;
type TaskStatus = typeof TASK_STATUSES[number];

const TaskSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  progress: { type: Number, min: 0, max: 10, default: 0 },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  reminders: [{ type: Schema.Types.ObjectId, ref: 'Reminder' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  dueDate: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
  status: {
    type: String,
    enum: TASK_STATUSES, // e.g., ['todo', 'in_progress', 'done']
    default: 'todo',
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});


export default models.Task || model('Task', TaskSchema);

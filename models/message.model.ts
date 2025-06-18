import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
  content: { type: String, required: true },

  // Who sent the message
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Which task it's related to (optional if it's a project message)
  task: { type: Schema.Types.ObjectId, ref: 'Task', default: null },

  // Optional: project-level message
  project: { type: Schema.Types.ObjectId, ref: 'Project', default: null },
}, { timestamps: true });

export default models.Message || model('Message', MessageSchema);

import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: String,

  // Personal owner (required)
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Optional team (null means personal project)
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },

  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

export default models.Project || model('Project', ProjectSchema);
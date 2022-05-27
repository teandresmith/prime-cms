import { Schema } from 'mongoose'
import {
  ContentType,
  Project,
  Data,
} from '../../../interfaces/project/project.interface'

const contentTypeSchema = new Schema<ContentType>({
  name: { type: String, required: true },
  type: { type: String, required: true },
})

const projectSchema = new Schema<Project>(
  {
    name: { type: String, required: true },
    collections: [
      {
        name: { type: String, required: true },
        contentType: [contentTypeSchema],
        data: [],
      },
    ],
  },
  { collection: 'Project' }
)

export default projectSchema

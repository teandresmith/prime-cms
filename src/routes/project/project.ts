import { Router } from 'express'
import {
  addProject,
  addProjectCollection,
  deleteProject,
  deleteProjectCollection,
  editProject,
  editProjectCollection,
  getProject,
  getProjects,
} from '../../controllers/project/project'
import { Authorization } from '../../middleware/auth'

const project = Router()

project.route('/').get(getProjects).post(addProject)

project
  .route('/:project')
  .get(getProject)
  .delete(deleteProject)
  .patch(editProject)

project.post('/:project/collection', addProjectCollection)
project
  .route('/:project/collection/:name')
  .patch(editProjectCollection)
  .delete(deleteProjectCollection)

export default project

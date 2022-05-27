import { Router } from 'express'
import {
  addCollectionContentType,
  deleteCollectionContentType,
  editCollectionContentType,
  getCollectionContentTypeByName,
  getCollectionContentTypes,
} from '../../controllers/project/contentType'

const contentTypes = Router()

contentTypes
  .route('/content-type')
  .get(getCollectionContentTypes)
  .post(addCollectionContentType)

contentTypes
  .route('/content-type/:contentId')
  .get(getCollectionContentTypeByName)
  .patch(editCollectionContentType)
  .delete(deleteCollectionContentType)

export default contentTypes

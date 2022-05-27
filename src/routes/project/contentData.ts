import { Router } from 'express'
import {
  addCollectionContentData,
  deleteCollectionContentData,
  editCollectionContentData,
  getAllCollectionContentData,
  getCollectionContentDataByID,
} from '../../controllers/project/contentData'

const contentData = Router()

contentData
  .route('/:project/:collection/content-data')
  .get(getAllCollectionContentData)
  .post(addCollectionContentData)

contentData
  .route('/:project/:collection/content-data/:contentId')
  .get(getCollectionContentDataByID)
  .patch(editCollectionContentData)
  .delete(deleteCollectionContentData)

export default contentData

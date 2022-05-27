import { Request, Response } from 'express'
import { ProjectModel } from '../../database/database'
import {
  Project,
  ContentType,
  Collection,
} from '../../interfaces/project/project.interface'
import { options } from '../statics'

export const getCollectionContentTypes = async (
  req: Request,
  res: Response
) => {
  const { project, collection } = req.params

  if (project === undefined || collection === undefined) {
    res.status(400).json({ message: options.EMPTY_PARAM })
    return
  }

  try {
    const foundProject: Project = await ProjectModel.findOne({ name: project })

    if (!foundProject) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const collectionIndex = foundProject?.collections?.findIndex(
      (value: Collection) => value.name === collection
    )

    if (collectionIndex === -1 || collectionIndex === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const data = foundProject?.collections?.[collectionIndex].contentType

    res.status(200).json({ message: options.QUERY_SUCCESS, result: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.QUERY_ERROR, error: error })
  }
}

export const getCollectionContentTypeByName = async (
  req: Request,
  res: Response
) => {
  const { project, collection, contentId } = req.params

  if (
    project === undefined ||
    collection === undefined ||
    contentId === undefined
  ) {
    res.status(400).json({ message: options.EMPTY_PARAM })
    return
  }

  try {
    const foundProject: Project = await ProjectModel.findOne({ name: project })

    if (!foundProject) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const collectionIndex = foundProject?.collections?.findIndex(
      (value: Collection) => value.name === collection
    )

    if (collectionIndex === -1 || collectionIndex === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const data = foundProject?.collections?.[collectionIndex].contentType?.find(
      (value: ContentType) => value.name === contentId
    )

    if (!data) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    res.status(200).json({ message: options.QUERY_SUCCESS, result: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.QUERY_ERROR, error: error })
  }
}

export const addCollectionContentType = async (req: Request, res: Response) => {
  const { project, collection } = req.params
  const newType: ContentType = req.body

  if (project === undefined || collection === undefined || !newType) {
    res.status(400).json({ message: options.EMPTY_PARAM })
    return
  }

  try {
    const foundProject = await ProjectModel.findOne({ name: project })

    if (!foundProject) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const collectionIndex = foundProject?.collections?.findIndex(
      (value: Collection) => value.name === collection
    )

    if (collectionIndex === -1 || collectionIndex === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    console.log()

    if (foundProject.collections[collectionIndex].contentType === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    if (foundProject.collections[collectionIndex].contentType === null) {
      let info: Array<ContentType> = []
      info.push(newType)
      foundProject.collections[collectionIndex].contentType = info
    } else {
      foundProject.collections[collectionIndex].contentType.push(newType)
    }

    await foundProject.save()

    res.status(200).json({ message: options.ADD_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.ADD_ERROR, error: error })
  }
}

export const editCollectionContentType = async (
  req: Request,
  res: Response
) => {
  const { project, collection, contentId } = req.params
  const updateType: ContentType = req.body

  if (
    project === undefined ||
    collection === undefined ||
    contentId === undefined
  ) {
    res.status(400).json({ message: options.EMPTY_PARAM })
    return
  }

  try {
    const foundProject = await ProjectModel.findOne({ name: project })

    if (!foundProject) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const collectionIndex = foundProject?.collections?.findIndex(
      (value: Collection) => value.name === collection
    )

    if (collectionIndex === -1 || collectionIndex === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const dataIndex = foundProject?.collections?.[
      collectionIndex
    ].contentType.findIndex((value: ContentType) => value.name === contentId)

    if (dataIndex === -1 || dataIndex === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    if (
      foundProject.collections[collectionIndex].contentType[dataIndex] ===
      undefined
    ) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    foundProject.collections[collectionIndex].contentType[dataIndex] =
      updateType

    await foundProject.save()

    res.status(200).json({ message: options.UPDATE_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.UPDATE_ERROR, error: error })
  }
}

export const deleteCollectionContentType = async (
  req: Request,
  res: Response
) => {
  const { project, collection, contentId } = req.params

  if (
    project === undefined ||
    collection === undefined ||
    contentId === undefined
  ) {
    res.status(400).json({ message: options.EMPTY_PARAM })
    return
  }

  try {
    const foundProject = await ProjectModel.findOne({ name: project })

    if (!foundProject) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const collectionIndex = foundProject?.collections?.findIndex(
      (value: Collection) => value.name === collection
    )

    if (collectionIndex === -1 || collectionIndex === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    if (
      foundProject?.collections?.[collectionIndex].contentType === undefined
    ) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const data: Array<ContentType> = foundProject.collections[
      collectionIndex
    ].contentType.filter((value: ContentType) => value.name !== contentId)

    foundProject.collections[collectionIndex].contentType = data
    await foundProject.save()

    res.status(200).json({ message: options.DELETE_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.DELETE_ERROR, error: error })
  }
}

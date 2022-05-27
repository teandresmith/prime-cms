import { Request, Response } from 'express'
import { ProjectModel } from '../../database/database'
import {
  Collection,
  Project,
  Data,
} from '../../interfaces/project/project.interface'
import { options } from '../statics'

export const getCollectionContentDataByID = async (
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

    const info = foundProject?.collections?.[collectionIndex]

    let data = info?.data?.find((value) => value?.id === contentId)

    if (data === undefined) {
      res.status(400).json({ message: options.NOT_FOUND })
      return
    }

    res.status(200).json({ message: options.QUERY_SUCCESS, result: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.QUERY_ERROR, error: error })
  }
}

export const getAllCollectionContentData = async (
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

    if (foundProject?.collections?.[collectionIndex].data === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const data: Array<Data> | null =
      foundProject.collections[collectionIndex].data

    res.status(200).json({ message: options.QUERY_SUCCESS, result: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.QUERY_ERROR, error: error })
  }
}

export const addCollectionContentData = async (req: Request, res: Response) => {
  const { project, collection } = req.params
  const { contentData }: Data = req.body

  if (project === undefined || collection === undefined) {
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

    if (foundProject?.collections?.[collectionIndex]?.data === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    if (foundProject.collections[collectionIndex].data === null) {
      let info: Array<Data> = []
      info.push(contentData)
      foundProject.collections[collectionIndex].data = info
    } else {
      foundProject.collections[collectionIndex].data.push(contentData)
    }

    await foundProject.save()

    res.status(200).json({ message: options.ADD_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.ADD_ERROR, error: error })
  }
}

export const editCollectionContentData = async (
  req: Request,
  res: Response
) => {
  const { project, collection, contentId } = req.params
  const { contentData }: Data = req.body

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

    let dataIndex = foundProject?.collections?.[
      collectionIndex
    ]?.data?.findIndex((value: Data) => value.id === contentId)

    if (dataIndex === -1 || dataIndex === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    if (
      foundProject.collections[collectionIndex].data[dataIndex] === undefined
    ) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    foundProject.collections[collectionIndex].data[dataIndex] = contentData

    await foundProject.save()

    res.status(200).json({ message: options.UPDATE_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.UPDATE_ERROR, error: error })
  }
}

export const deleteCollectionContentData = async (
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

    if (foundProject?.collections?.[collectionIndex]?.data === undefined) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const newData: Data = foundProject.collections[collectionIndex].data.filter(
      (value: Data) => value.id !== contentId
    )

    foundProject.collections[collectionIndex].data = newData

    await foundProject.save()

    res.status(200).json({ message: options.DELETE_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.DELETE_ERROR, error: error })
  }
}

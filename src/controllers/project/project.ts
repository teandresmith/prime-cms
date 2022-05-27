import { Response, Request } from 'express'
import { ProjectModel } from '../../database/database'
import { options } from '../statics'
import { Project, Collection } from '../../interfaces/project/project.interface'

export const getProject = async (req: Request, res: Response) => {
  const name = req.params.project

  if (name === undefined) {
    res.status(400).json({ message: options.EMPTY_PARAM })
    return
  }

  try {
    const project = await ProjectModel.findOne({ name: name })

    if (!project) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    res.status(200).json({ message: options.QUERY_SUCCESS, result: project })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.QUERY_ERROR, error: error })
  }
}

export const getProjects = async (req: Request, res: Response) => {
  try {
    const project = await ProjectModel.find()

    if (!project) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    res.status(200).json({ message: options.QUERY_SUCCESS, result: project })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.QUERY_ERROR, error: error })
  }
}

export const addProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (name === undefined) {
      res.status(400).json({ message: options.MISSING_BODY })
      return
    }

    const newProject: Project = {
      name: name,
      collections: null,
    }

    await ProjectModel.create(newProject)

    res.status(200).json({ message: options.ADD_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.ADD_ERROR, error: error })
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  const project = req.params.project

  if (project === undefined) {
    res.status(400).json({ message: options.EMPTY_PARAM })
    return
  }
  try {
    await ProjectModel.deleteOne({ name: project })

    res.status(200).json({ message: options.DELETE_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.DELETE_ERROR, error: error })
  }
}

export const editProject = async (req: Request, res: Response) => {
  const project = req.params.project
  const { name } = req.body

  if (name === undefined || project === undefined) {
    res.status(400).json({ message: options.EMPTY_PARAM })
    return
  }

  try {
    const foundProject = await ProjectModel.findOne({ name: project })

    if (!foundProject) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    foundProject.name = name

    await foundProject.save()

    res.status(200).json({ message: options.UPDATE_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.UPDATE_ERROR, error: error })
  }
}

export const addProjectCollection = async (req: Request, res: Response) => {
  const { collection } = req.body
  const project = req.params.project

  if (collection === undefined || project === undefined) {
    res.status(400).json({ message: options.MISSING_BODY })
    return
  }

  try {
    const foundProject = await ProjectModel.findOne({ name: project })

    if (!foundProject) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const newCollection: Collection = collection

    let data: Array<Collection> = foundProject?.collections

    if (data === null) {
      data = []
      data.push(newCollection)
    } else {
      data.push(newCollection)
    }

    foundProject!.collections = data

    await foundProject.save()

    res.status(200).json({ message: options.ADD_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.ADD_ERROR, error: error })
  }
}

export const editProjectCollection = async (req: Request, res: Response) => {
  const { collection } = req.body
  const { project, name } = req.params

  if (name === undefined || project === undefined || collection === undefined) {
    res
      .status(400)
      .json({ message: `${options.MISSING_BODY} or ${options.EMPTY_PARAM}` })
    return
  }

  try {
    const foundProject = await ProjectModel.findOne({ name: project })

    if (!foundProject) {
      res.status(400).json({ message: options.QUERY_ERROR })
      return
    }

    const collectionIndex = foundProject?.collections?.findIndex(
      (value: Collection) => value.name === name
    )

    if (collectionIndex === -1 || collectionIndex === undefined) {
      res.status(400).json({ message: options.UPDATE_ERROR })
      return
    }

    foundProject.collections[collectionIndex] = collection
    await foundProject.save()

    res.status(200).json({ message: options.UPDATE_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.UPDATE_ERROR, error: error })
  }
}

export const deleteProjectCollection = async (req: Request, res: Response) => {
  const { project, name } = req.params

  if (project === undefined || name === undefined) {
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
      (value: Collection) => value.name === name
    )

    if (collectionIndex === -1 || collectionIndex === undefined) {
      res.status(400).json({ message: options.DELETE_ERROR })
      return
    }

    if (foundProject?.collections?.length === 1) {
      foundProject.collections = null
    } else {
      const data = foundProject.collections.filter(
        (value: Collection) => value.name !== name
      )
      foundProject.collections = data
    }

    await foundProject.save()

    res.status(200).json({ message: options.DELETE_SUCCESS })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: options.DELETE_ERROR, error: error })
  }
}

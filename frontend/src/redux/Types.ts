export type Project = {
  name: string
  collections: Array<Collection> | null
}

export type Collection = {
  name: string
  contentType: Array<ContentType> | null
  schema: Array<string> | null
  data: Array<Data> | null
}

export type ContentType = {
  type: string
  name: string
}

export type Data = {
  id: string
  [key: string]: any
}

export type ProjectResponse = {
  message: string
  result: Project
}

export type CollectionResponse = {
  message: string
  result: Collection
}

export type ContenTypesResponse = {
  message: string
  result: Array<ContentType>
}

export interface Project {
  name: string
  collections: Array<Collection> | null
}

export interface Collection {
  name: string
  contentType: Array<ContentType> | null
  schema: Array<string> | null
  data: Array<Data> | null
}

export interface ContentType {
  type: string
  name: string
}

export interface Data {
  _id: string
  [key: string]: any
}

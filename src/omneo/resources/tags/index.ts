import { RequestParams, Tag, TagInput, TagResponse } from '../../../types'
import Resource from '../resource.js'

export default class Tags extends Resource {
  get (id: number, params?: RequestParams): Promise<Tag> {
    return this.client.call({
      method: 'get',
      endpoint: `/tags/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  // Non paginated response
  list (params?: RequestParams): Promise<TagResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/tags',
      params
    })
  }

  create (body: TagInput): Promise<Tag> {
    return this.client.call({
      method: 'post',
      endpoint: '/tags',
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/tags/${id}`
    }).then((response) => {
      return response.data
    })
  }
}

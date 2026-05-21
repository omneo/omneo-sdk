import { RequestCreateTag, RequestQueryTag, TagOriginal, TagOriginalResponse } from '@types'
import Resource from '../resource.js'

export default class Tags extends Resource {
  get (id: number): Promise<TagOriginal> {
    return this.client.call({
      method: 'get',
      endpoint: `/tags/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryTag): Promise<TagOriginalResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/tags',
      params
    })
  }

  create (body: RequestCreateTag): Promise<TagOriginal> {
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

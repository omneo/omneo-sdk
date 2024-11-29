import { Point, PointInput, PointResponse, RequestParams } from '../../../types'
import Resource from '../resource.js'

export default class Points extends Resource {
  get (id: string, params?: RequestParams): Promise<Point> {
    return this.client.call({
      method: 'get',
      endpoint: `/points/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<PointResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/points',
      params
    })
  }

  create (body: PointInput): Promise<Point> {
    return this.client.call({
      method: 'post',
      endpoint: '/points',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: string, body: PointInput): Promise<Point> {
    return this.client.call({
      method: 'put',
      endpoint: `/points/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  // Does not exist
  // delete (id: string): Promise<void> {
  //   return this.client.call({
  //     method: 'delete',
  //     endpoint: `/points/${id}`
  //   })
  // }
}

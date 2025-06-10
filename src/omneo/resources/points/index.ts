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
}

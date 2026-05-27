import { Point, PointResponse, RequestCreatePoint, RequestQueryPoint } from '@types'
import Resource from '../resource.js'

export default class Points extends Resource {
  get (id: string): Promise<Point> {
    return this.client.call({
      method: 'get',
      endpoint: `/points/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryPoint): Promise<PointResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/points',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreatePoint): Promise<Point> {
    return this.client.call({
      method: 'post',
      endpoint: '/points',
      body
    }).then((response) => {
      return response.data
    })
  }
}

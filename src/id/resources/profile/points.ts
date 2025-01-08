import { RequestParams, Point, PointInput, PointResponse } from '../../../types'
import Resource from '../resource'

export default class ProfilePoints extends Resource {
  get (pointID: number): Promise<Point> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/points/${pointID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<PointResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/points',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: PointInput): Promise<Point> {
    return this.client.call({
      method: 'post',
      endpoint: '/profiles/me/points',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (pointID: string, body: Partial<PointInput>): Promise<Point> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/points/${pointID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (pointID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/points/${pointID}`
    }).then((response) => {
      return response.data
    })
  }
}

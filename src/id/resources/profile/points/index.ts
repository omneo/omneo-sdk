import { RequestParams, Point, PointInput, PointResponse } from '../../../../types'
import Resource from '../../resource'

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
}

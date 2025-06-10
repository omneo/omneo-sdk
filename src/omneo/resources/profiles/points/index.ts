import { RequestParams, Point, PointResponse } from '../../../../types'
import Resource from '../../resource'

export default class ProfilePoints extends Resource {
  get (profileID: string, pointID: number): Promise<Point> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/points/${pointID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<PointResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/points`,
      params
    }).then((response) => {
      return response
    })
  }
}

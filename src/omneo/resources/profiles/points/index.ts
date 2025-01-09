import { RequestParams, Point, PointInput, PointResponse } from '../../../../types'
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

  create (profileID: string, body: PointInput): Promise<Point> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/points`,
      body
    }).then((response) => {
      return response.data
    })
  }

  update (profileID: string, pointID: string, body: Partial<PointInput>): Promise<Point> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/points/${pointID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, pointID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/points/${pointID}`
    }).then((response) => {
      return response.data
    })
  }
}

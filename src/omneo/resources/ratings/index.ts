import { CreateRatingInput, Rating, RatingResponse, RequestParams, UpdateRatingInput } from '@types'
import Resource from '../resource.js'

export default class Ratings extends Resource {
  list (params?: RequestParams): Promise<RatingResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/ratings',
      params
    }).then((response) => {
      return response
    })
  }

  get (id: number): Promise<Rating> {
    return this.client.call({
      method: 'GET',
      endpoint: `/ratings/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: CreateRatingInput): Promise<Rating> {
    return this.client.call({
      method: 'POST',
      endpoint: '/ratings',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateRatingInput): Promise<Rating> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/ratings/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  destroy (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/ratings/${id}`
    }).then((response) => {
      return response
    })
  }
}

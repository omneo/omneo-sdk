import { ClaimShareInput, CreateShareInput, RequestParams, Share, ShareClaim, ShareResponse, UpdateShareInput } from '@types'
import Resource from '../resource.js'

export default class Shares extends Resource {
  list (params?: RequestParams): Promise<ShareResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/shares',
      params
    }).then((response) => {
      return response
    })
  }

  get (id: number): Promise<Share> {
    return this.client.call({
      method: 'GET',
      endpoint: `/shares/${id}`
    }).then((response) => {
      return response.data
    })
  }

  create (body: CreateShareInput): Promise<Share> {
    return this.client.call({
      method: 'POST',
      endpoint: '/shares',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateShareInput): Promise<Share> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/shares/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/shares/${id}`
    }).then((response) => {
      return response
    })
  }

  claim (id: number, body: ClaimShareInput): Promise<ShareClaim> {
    return this.client.call({
      method: 'POST',
      endpoint: `/shares/${id}/claim`,
      body
    }).then((response) => {
      return response.data
    })
  }
}

import { RequestClaimShare, Share, RequestParams, ShareClaim, ShareResponse } from '@types'
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

  create (body: Share): Promise<Share> {
    return this.client.call({
      method: 'POST',
      endpoint: '/shares',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Share): Promise<Share> {
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

  claim (id: number, body: RequestClaimShare): Promise<ShareClaim> {
    return this.client.call({
      method: 'POST',
      endpoint: `/shares/${id}/claim`,
      body
    }).then((response) => {
      return response.data
    })
  }
}

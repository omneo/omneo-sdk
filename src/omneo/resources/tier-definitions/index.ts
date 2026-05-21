import { RequestParams, TierDefinition, TierDefinitionResponse } from '@types'
import Resource from '../resource.js'

export default class TierDefinitions extends Resource {
  get (id: number, params?: RequestParams): Promise<TierDefinition> {
    return this.client.call({
      method: 'GET',
      endpoint: `/tiers/definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<TierDefinitionResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/tiers/definitions',
      params
    })
  }

  create (body: TierDefinition): Promise<TierDefinition> {
    return this.client.call({
      method: 'POST',
      endpoint: '/tiers/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: TierDefinition): Promise<TierDefinition> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/tiers/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'DELETE',
      endpoint: `/tiers/definitions/${id}`
    })
  }
}

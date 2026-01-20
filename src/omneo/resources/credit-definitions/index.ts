import { RequestParams, CreditDefinition, CreditDefinitionInput, UpdateCreditDefinitionInput, CreditDefinitionResponse } from '@types'
import Resource from '../resource.js'

export default class CreditDefinitions extends Resource {
  get (id: number, params?: RequestParams): Promise<CreditDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/credits/definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<CreditDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/credits/definitions',
      params
    }).then((response) => {
      return response
    })
  }

  create (body: CreditDefinitionInput): Promise<CreditDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/credits/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: UpdateCreditDefinitionInput): Promise<CreditDefinition> {
    return this.client.call({
      method: 'put',
      endpoint: `/credits/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/credits/definitions/${id}`
    }).then((response) => {
      return response
    })
  }
}

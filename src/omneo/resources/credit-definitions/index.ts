import { CreditDefinition, CreditDefinitionResponse, RequestCreateCreditDefinition, RequestUpdateCreditDefinition, RequestQueryCreditDefinition } from '@types'
import Resource from '../resource.js'

export default class CreditDefinitions extends Resource {
  get (id: number): Promise<CreditDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/credits/definitions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryCreditDefinition): Promise<CreditDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/credits/definitions',
      params,
      flattenParams: true
    }).then((response) => {
      return response
    })
  }

  create (body: RequestCreateCreditDefinition): Promise<CreditDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/credits/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateCreditDefinition): Promise<CreditDefinition> {
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

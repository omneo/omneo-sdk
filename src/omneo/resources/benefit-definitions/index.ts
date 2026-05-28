import { BenefitDefinition, BenefitDefinitionResponse, RequestCreateBenefitDefinition, RequestUpdateBenefitDefinition, RequestQueryBenefitDefinition, RequestCloneBenefitDefinition } from '@types'
import Resource from '../resource.js'

export default class BenefitDefinitions extends Resource {
  get (id: number): Promise<BenefitDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/benefits/definitions/${id}`
    }).then((response) => {
      return response.data
    })
  }

  clone (id: number, body: RequestCloneBenefitDefinition): Promise<BenefitDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: `/benefits/definitions/${id}/clone`,
      body
    }).then((response) => {
      return response.data
    })
  }

  getByHandle (handle: string): Promise<BenefitDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/benefits/definitions/handle/${handle}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryBenefitDefinition): Promise<BenefitDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/benefits/definitions',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateBenefitDefinition): Promise<BenefitDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/benefits/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateBenefitDefinition): Promise<BenefitDefinition> {
    return this.client.call({
      method: 'put',
      endpoint: `/benefits/definitions/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/benefits/definitions/${id}`
    })
  }
}

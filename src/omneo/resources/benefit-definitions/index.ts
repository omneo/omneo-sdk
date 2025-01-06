import { BenefitDefinition, BenefitDefinitionInput, BenefitDefinitionResponse } from '../../../types'
import { RequestParams } from '../../../types/index.js'
import Resource from '../resource.js'

export default class BenefitDefinitions extends Resource {
  get (id: number, params?: RequestParams): Promise<BenefitDefinition> {
    return this.client.call({
      method: 'get',
      endpoint: `/benefits/definitions/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<BenefitDefinitionResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/benefits/definitions',
      params
    })
  }

  create (body: BenefitDefinitionInput): Promise<BenefitDefinition> {
    return this.client.call({
      method: 'post',
      endpoint: '/benefits/definitions',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<BenefitDefinitionInput>): Promise<BenefitDefinition> {
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

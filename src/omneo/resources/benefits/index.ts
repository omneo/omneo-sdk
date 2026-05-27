import { Benefit, BenefitResponse, RequestCreateBenefit, RequestUpdateBenefit, RequestQueryBenefit, RequestExtendBenefit, BenefitCountResponse } from '@types'
import Resource from '../resource.js'

export default class Benefits extends Resource {
  get (id: number): Promise<Benefit> {
    return this.client.call({
      method: 'get',
      endpoint: `/benefits/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryBenefit): Promise<BenefitResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/benefits',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateBenefit): Promise<Benefit> {
    return this.client.call({
      method: 'post',
      endpoint: '/benefits',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: RequestUpdateBenefit): Promise<Benefit> {
    return this.client.call({
      method: 'put',
      endpoint: `/benefits/${id}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (id: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/benefits/${id}`
    })
  }

  extend (body: RequestExtendBenefit) : Promise<BenefitResponse> {
    return this.client.call({
      method: 'post',
      endpoint: '/benefits/extend',
      body
    }).then((response) => {
      return response
    })
  }

  count () : Promise<BenefitCountResponse['data']> {
    return this.client.call({
      method: 'get',
      endpoint: '/benefits.count'
    }).then((response) => response.data)
  }

  getTriggerTarget (benefitId: number, type: string): Promise<void> {
    return this.client.call({
      method: 'get',
      endpoint: `/benefits/${benefitId}/trigger-target/${type}`
    }).then((response) => {
      return response.data
    })
  }
}

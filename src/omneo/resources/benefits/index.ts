import { RequestParams, Benefit, BenefitResponse, BenefitInput } from '../../../types'
import Resource from '../resource.js'

export default class Benefits extends Resource {
  get (id: number, params?: RequestParams): Promise<Benefit> {
    return this.client.call({
      method: 'get',
      endpoint: `/benefits/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<BenefitResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/benefits',
      params
    })
  }

  create (body: BenefitInput): Promise<Benefit> {
    return this.client.call({
      method: 'post',
      endpoint: '/benefits',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (id: number, body: Partial<BenefitInput>): Promise<Benefit> {
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

  extend (body: { ids: number[], extend_date?: string, profile_id: string, extend_days?: number }) : Promise<{ data: Benefit[]}> {
    return this.client.call({
      method: 'post',
      endpoint: '/benefits/extend',
      body
    })
  }

  count () : Promise<{ countAll: number, countRedeemed: number }> {
    return this.client.call({
      method: 'get',
      endpoint: '/benefits.count'
    }).then((response) => response.data)
  }
}

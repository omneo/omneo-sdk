import { RequestParams, Benefit, BenefitResponse, BenefitInput } from '../../../../types'
import Resource from '../../resource'

export default class ProfileBenefits extends Resource {
  get (benefitID: number): Promise<Benefit> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/benefits/${benefitID}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<BenefitResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/benefits',
      params
    }).then((response) => {
      return response
    })
  }

  update (benefitID: number, body: Partial<BenefitInput>): Promise<Benefit> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/me/benefits/${benefitID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (benefitID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/benefits/${benefitID}`
    }).then((response) => {
      return response.data
    })
  }

  redeem (benefitID: number): Promise<Benefit> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/me/benefits/${benefitID}/redeem`
    }).then((response) => {
      return response.data
    })
  }
}

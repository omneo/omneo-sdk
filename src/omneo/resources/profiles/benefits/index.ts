import { RequestParams, Benefit, BenefitResponse, BenefitInput } from '../../../../types'
import Resource from '../../resource'

export default class ProfileBenefits extends Resource {
  get (profileID: string, benefitID: number): Promise<Benefit> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/benefits/${benefitID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<BenefitResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/benefits`,
      params
    }).then((response) => {
      return response
    })
  }

  update (profileID: string, benefitID: string, body: Partial<BenefitInput>): Promise<Benefit> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileID}/benefits/${benefitID}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileID: string, benefitID: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/benefits/${benefitID}`
    }).then((response) => {
      return response.data
    })
  }

  redeem (profileID: string, benefitID: number): Promise<Benefit> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileID}/benefits/${benefitID}/redeem`
    }).then((response) => {
      return response.data
    })
  }
}

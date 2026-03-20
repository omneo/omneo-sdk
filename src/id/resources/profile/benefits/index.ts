import { RequestParams, Benefit, BenefitResponse, BenefitInput, BenefitDefinition, ClaimBenefitInput, Redemption } from '@types'
import Resource from '@id/resources/resource'

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

  viewable (): Promise<BenefitDefinition[]> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/benefits/viewable'
    }).then((response) => {
      return response.data
    })
  }

  claimable (): Promise<BenefitDefinition[]> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/benefits/claimable'
    }).then((response) => {
      return response.data
    })
  }

  claim (claimInput: ClaimBenefitInput): Promise<Benefit> {
    return this.client.call({
      method: 'POST',
      endpoint: '/profiles/me/benefits/claim',
      body: claimInput
    }).then((response) => {
      return response.data
    })
  }

  claimRedeem (claimInput: ClaimBenefitInput): Promise<Redemption> {
    return this.client.call({
      method: 'POST',
      endpoint: '/profiles/me/benefits/claim-redeem',
      body: claimInput
    }).then((response) => {
      return response.data
    })
  }

  redeemable (params?: RequestParams): Promise<BenefitResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/profiles/me/redeemable_benefits',
      params
    }).then((response) => {
      return response
    })
  }
}

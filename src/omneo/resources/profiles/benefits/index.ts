import { RequestParams, Benefit, BenefitResponse, BenefitInput, BenefitDefinition, ClaimBenefitInput, Redemption } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileBenefits extends Resource {
  get (profileId: string, benefitId: number): Promise<Benefit> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileId}/benefits/${benefitId}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileId: string, params?: RequestParams): Promise<BenefitResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileId}/benefits`,
      params
    }).then((response) => {
      return response
    })
  }

  update (profileId: string, benefitId: string, body: Partial<BenefitInput>): Promise<Benefit> {
    return this.client.call({
      method: 'put',
      endpoint: `/profiles/${profileId}/benefits/${benefitId}`,
      body
    }).then((response) => {
      return response.data
    })
  }

  delete (profileId: string, benefitId: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileId}/benefits/${benefitId}`
    }).then((response) => {
      return response.data
    })
  }

  redeem (profileId: string, benefitId: number): Promise<Benefit> {
    return this.client.call({
      method: 'post',
      endpoint: `/profiles/${profileId}/benefits/${benefitId}/redeem`
    }).then((response) => {
      return response.data
    })
  }

  viewable (profileId: string, benefitId: number): Promise<BenefitDefinition[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileId}/benefits/viewable`
    }).then((response) => {
      return response.data
    })
  }

  claimable (profileId: string): Promise<BenefitDefinition[]> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileId}/benefits/claimable`
    }).then((response) => {
      return response.data
    })
  }

  claim (profileId: string, claimInput: ClaimBenefitInput): Promise<Benefit> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileId}/benefits/claim`,
      body: claimInput
    }).then((response) => {
      return response.data
    })
  }

  claimRedeem (profileId: string, claimInput: ClaimBenefitInput): Promise<Redemption> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileId}/benefits/claim-redeem`,
      body: claimInput
    }).then((response) => {
      return response.data
    })
  }

  redeemable (profileId: string, params?: RequestParams): Promise<BenefitResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: `/profiles/${profileId}/redeemable_benefits`,
      params
    }).then((response) => {
      return response
    })
  }
}

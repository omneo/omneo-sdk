import { RequestParams, RequestClaimTransaction, TransactionClaim, ProfileTransactionClaimResponse } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileTransactionsClaim extends Resource {
  get (profileID: string, claimId: number): Promise<TransactionClaim> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactions/claims/${claimId}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<ProfileTransactionClaimResponse> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactions/claims`,
      params
    }).then((response) => {
      return response
    })
  }

  delete (profileID: string, claimId: number): Promise<void> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/${profileID}/transactions/claims/${claimId}`
    }).then((response) => {
      return response.data
    })
  }

  create (profileId: string, claimInput: RequestClaimTransaction): Promise<TransactionClaim> {
    return this.client.call({
      method: 'POST',
      endpoint: `/profiles/${profileId}/transactions/claims`,
      body: claimInput
    }).then((response) => {
      return response.data
    })
  }
}

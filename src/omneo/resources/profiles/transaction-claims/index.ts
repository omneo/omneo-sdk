import { RequestParams, TransactionClaim, TransactionClaimsResponse } from '../../../../types'
import Resource from '../../resource'

export default class ProfileTransactionsClaim extends Resource {
  get (profileID: string, claimId: number): Promise<TransactionClaim> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/transactions/claims/${claimId}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string, params?: RequestParams): Promise<TransactionClaimsResponse> {
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
}

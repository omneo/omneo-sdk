import { TransactionClaim, TransactionClaimsResponse, RequestParams } from '../../../types'
import Resource from '../resource'

export default class ProfileTransactions extends Resource {
  get (claimId: number): Promise<TransactionClaim> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/transactions/claims/${claimId}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<TransactionClaimsResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/transactions/claims',
      params
    }).then((response) => {
      return response
    })
  }
}

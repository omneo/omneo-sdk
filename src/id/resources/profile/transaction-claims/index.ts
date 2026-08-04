import { TransactionClaim, TransactionClaimsResponse, RequestParams, ClaimTransactionInput } from '@types'
import Resource from '@id/resources/resource'

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

  delete (claimId: number): Promise<TransactionClaimsResponse> {
    return this.client.call({
      method: 'delete',
      endpoint: `/profiles/me/transactions/claims/${claimId}`
    }).then((response) => {
      return response
    })
  }

  create (claimInput: ClaimTransactionInput): Promise<TransactionClaim> {
    return this.client.call({
      method: 'POST',
      endpoint: '/profiles/me/transactions/claims',
      body: claimInput
    }).then((response) => {
      return response.data
    })
  }
}

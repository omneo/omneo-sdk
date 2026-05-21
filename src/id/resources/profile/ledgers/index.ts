import { Ledger, LedgerResponse } from '@types'
import Resource from '@id/resources/resource'

export default class ProfileLedgers extends Resource {
  get (ledgerID: number): Promise<(LedgerResponse | Ledger)> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/ledgers/${ledgerID}`
    }).then((response) => {
      return response.data
    })
  }

  list (): Promise<(LedgerResponse | Ledger)[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/ledgers'
    }).then((response) => {
      return response
    })
  }
}

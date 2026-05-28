import { Ledger, LedgerResponse } from '@types'
import Resource from '@omneo/resources/resource'

export default class ProfileLedgers extends Resource {
  get (profileID: string, ledgerID: number): Promise<(LedgerResponse | Ledger)> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/ledgers/${ledgerID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string): Promise<(LedgerResponse | Ledger)[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/ledgers`
    }).then((response) => {
      return response.data
    })
  }
}

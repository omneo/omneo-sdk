import { OrderLedger, TransactionLedger } from '../../../../types'
import Resource from '../../resource'

export default class ProfileLedgers extends Resource {
  get (ledgerID: string): Promise<(TransactionLedger | OrderLedger)> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/me/ledgers/${ledgerID}`
    }).then((response) => {
      return response.data
    })
  }

  list (): Promise<(TransactionLedger | OrderLedger)[]> {
    return this.client.call({
      method: 'get',
      endpoint: '/profiles/me/ledgers'
    }).then((response) => {
      return response.data
    })
  }
}

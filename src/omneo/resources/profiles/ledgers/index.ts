import { OrderLedger, TransactionLedger } from '../../../../types'
import Resource from '../../resource'

export default class ProfileLedgers extends Resource {
  get (profileID: string, ledgerID: number): Promise<(TransactionLedger | OrderLedger)> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/ledgers/${ledgerID}`
    }).then((response) => {
      return response.data
    })
  }

  list (profileID: string): Promise<(TransactionLedger | OrderLedger)[]> {
    return this.client.call({
      method: 'get',
      endpoint: `/profiles/${profileID}/ledgers`
    }).then((response) => {
      return response.data
    })
  }
}

import { CurrencyResponse, RequestParams } from '../../../types'
import Resource from '../resource.js'

export default class Currencies extends Resource {
  list (params?: RequestParams): Promise<CurrencyResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/currencies',
      params
    })
  }
}

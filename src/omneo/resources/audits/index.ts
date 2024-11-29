import { Audit, AuditResponse, RequestParams } from '../../../types'
import Resource from '../resource.js'

export default class Audits extends Resource {
  get (id: number, params?: RequestParams): Promise<Audit> {
    return this.client.call({
      method: 'get',
      endpoint: `/audits/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AuditResponse> {
    return this.client.call({
      method: 'get',
      endpoint: '/audits',
      params
    })
  }
}

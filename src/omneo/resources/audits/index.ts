import { RequestCreateAudit, RequestUpdateAudit, Audit, AuditResponse, RequestQueryAudit } from '@types'
import Resource from '../resource.js'

export default class Audits extends Resource {
  get (id: number): Promise<Audit> {
    return this.client.call({
      method: 'GET',
      endpoint: `/audits/${id}`
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestQueryAudit): Promise<AuditResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/audits',
      params,
      flattenParams: true
    })
  }

  create (body: RequestCreateAudit): Promise<Audit> {
    return this.client.call({
      method: 'POST',
      endpoint: '/audits',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (auditId: number, body: RequestUpdateAudit): Promise<Audit> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/audits/${auditId}`,
      body
    }).then((response) => {
      return response.data
    })
  }
}

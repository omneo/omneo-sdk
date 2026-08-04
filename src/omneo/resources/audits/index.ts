import { Audit, AuditResponse, CreateAuditInput, RequestParams, UpdateAuditInput } from '@types'
import Resource from '../resource.js'

export default class Audits extends Resource {
  get (id: number, params?: RequestParams): Promise<Audit> {
    return this.client.call({
      method: 'GET',
      endpoint: `/audits/${id}`,
      params
    }).then((response) => {
      return response.data
    })
  }

  list (params?: RequestParams): Promise<AuditResponse> {
    return this.client.call({
      method: 'GET',
      endpoint: '/audits',
      params
    })
  }

  create (body: CreateAuditInput): Promise<Audit> {
    return this.client.call({
      method: 'POST',
      endpoint: '/audits',
      body
    }).then((response) => {
      return response.data
    })
  }

  update (auditId: number, body: UpdateAuditInput): Promise<Audit> {
    return this.client.call({
      method: 'PUT',
      endpoint: `/audits/${auditId}`,
      body
    }).then((response) => {
      return response.data
    })
  }
}

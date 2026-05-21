import { RequestTriggerCustomEvent } from '@types'
import Resource from '../resource.js'
import TenantCustomFields from './custom-fields/index.js'

export default class Tenants extends Resource {
  customFields = new TenantCustomFields(this.client)

  customEvent (body: RequestTriggerCustomEvent): Promise<{data: RequestTriggerCustomEvent['context']}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/tenants/custom-event',
      body
    }).then((response) => {
      return response
    })
  }
}

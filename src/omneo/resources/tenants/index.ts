import { TriggerCustomEvent } from '@types'
import Resource from '../resource.js'
import TenantCustomFields from './custom-fields/index.js'

export default class Tenants extends Resource {
  customFields = new TenantCustomFields(this.client)

  customEvent (body: TriggerCustomEvent): Promise<{data: TriggerCustomEvent['context']}> {
    return this.client.call({
      method: 'POST',
      endpoint: '/tenants/custom-event',
      body
    }).then((response) => {
      return response
    })
  }
}

import { ID, Omneo } from '../..'

export default class Resource {
  client: Omneo | ID
  private init?: () => void
  constructor (client: Omneo | ID) {
    this.client = client
    if (this.init) this.init()
  }
}

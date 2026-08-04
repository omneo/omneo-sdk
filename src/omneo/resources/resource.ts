import { Omneo } from '@omneo'

export default class Resource {
  client: Omneo
  private init?: () => void
  constructor (client: Omneo) {
    this.client = client
    if (this.init) this.init()
  }
}

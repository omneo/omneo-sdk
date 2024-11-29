import { describe, expect, test } from 'vitest'
import { Audit } from '../../../../types'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'
const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Audits get', () => {
  test('SDK can get an audit.', async () => {
    const testAudit: Audit = await simpleOmneoRequest('GET', '/audits').then(({ data }) => {
      return data[0]
    })
    const sdkAudit = await omneo.audits.get(testAudit.id)
    expect(sdkAudit).toEqual(testAudit)
  })
})

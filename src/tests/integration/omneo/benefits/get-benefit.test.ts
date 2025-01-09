import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'
import simpleOmneoRequest from '../../../lib/simple-omneo-request'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Benefit get', () => {
  test('SDK get benefit', async () => {
    const { data: benefits } = await simpleOmneoRequest('GET', '/benefits')
    if (!benefits.length) throw (new Error('Failed to get benefits'))

    const selectedBenefit = benefits[0]
    const benefit = await omneo.benefits.get(selectedBenefit.id)
    expect(benefit.id).toEqual(selectedBenefit.id)
  })
})

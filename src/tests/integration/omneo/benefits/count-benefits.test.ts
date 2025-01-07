import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Benefits count', async () => {
  test('SDK count benefits', async () => {
    const { countAll, countRedeemed } = await omneo.benefits.count()

    expect(typeof countAll).toBe('number')
    expect(typeof countRedeemed).toBe('number')
  })
})

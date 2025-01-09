import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'

const omneo = new Omneo({
  tenant: process.env.OMNEO_TENANT as string,
  token: process.env.OMNEO_TOKEN as string
})

describe('Users me', () => {
  test('SDK can get current user', async () => {
    const user = await omneo.users.me()

    expect(typeof user.name).toEqual('string')
    expect(typeof user.id).toEqual('number')
  })
})

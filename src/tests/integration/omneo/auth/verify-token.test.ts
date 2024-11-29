import { describe, expect, test } from 'vitest'
import { Omneo } from '../../../../omneo'

describe('Verify Token', () => {
  test('SDK can verify valid token', async () => {
    const omneo = new Omneo({
      tenant: process.env.OMNEO_TENANT as string,
      token: process.env.OMNEO_TOKEN as string
    })

    const response = await omneo.auth.verifyToken()
    expect(response.status).toBe(200)
  })

  test('SDK can verify invalid token', async () => {
    const omneo = new Omneo({
      tenant: process.env.OMNEO_TENANT as string,
      token: 'BAD-TOKEN'
    })

    await expect(omneo.auth.verifyToken()).rejects.toEqual({ message: 'Unauthenticated.' })
  })
})

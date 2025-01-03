export type Setting = {
  id: number
  handle: string
  value: string
  type: string
  created_at: string
  updated_at: string
}

export type SettingInput = Partial<Setting> & {
  handle: Setting['handle']
}

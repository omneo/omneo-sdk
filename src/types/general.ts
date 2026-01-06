export type CustomField = {
    name?: string
    handle: string
    namespace: string
    value: string | { [key: string]: any} | any[] | number | boolean | null
    type: 'string'| 'integer'| 'float'| 'boolean'| 'json'| 'array'
    custom_fieldable_type?: 'profile' | 'list' | 'order' | 'item' | 'achievement_definition' | 'achievement_level'
    custom_fieldable?: any
    created_at?: string
    updated_at?: string
    version?: null | string |number
    is_index?: boolean | null
}

export type CustomFieldInput = {
    name?: CustomField['name']
    type: CustomField['type']
    handle: CustomField['handle']
    namespace: CustomField['namespace']
    value: CustomField['value']
}

type PartialCustomFieldKeys = 'type' | 'handle' | 'namespace'
export type UpdateCustomFieldInput = Omit<CustomFieldInput, PartialCustomFieldKeys> &
  Partial<Pick<CustomFieldInput, PartialCustomFieldKeys>>

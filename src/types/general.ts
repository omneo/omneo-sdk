export type CustomField = {
    name: string
    handle: string
    namespace: string
    value: string | { [key: string]: any} | any[] | number | boolean | null
    type: 'string'| 'integer'| 'float'| 'boolean'| 'json'| 'array'
    created_at: string
    updated_at: string
    version: null | string
}

export type CustomFieldInput = {
    name: CustomField['name']
    handle: CustomField['handle']
    namespace: CustomField['namespace']
    value: CustomField['value']
}

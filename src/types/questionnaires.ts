// Route category: questionnaires

import type { FilterOperator, AnyJsonRecord, AnyRecord } from './common'

import type { PaginationLink, PaginationMeta } from './pagination'
import type { Question, QuestionVersion } from './questions'

export type QuestionnairePurposeEnum = 'booking' | 'general' | 'waitlist' | 'walk_in' | 'pre_visit' | 'post_visit' | 'cancellation' | 'profile_onboarding' | 'interaction' | 'survey'

export type CreateQuestionnaireItem = {
  is_active?: boolean
  is_required?: boolean
  mapping_key?: string | null
  question_handle?: string
  question_id?: number
  question_version_id?: number | null
  sort_order?: number
  visibility_condition?: AnyJsonRecord | null
}

export type RequestCreateQuestionnairePage = {
  description?: string | null
  image_url?: string | null
  section_header?: string | null
  sort_order?: number
  title?: string | null
}

export type RequestCreateQuestionnaireQuestion = {
  is_active?: boolean
  is_required?: boolean
  mapping_key: string
  question_id: number
  question_version_id?: number | null
  questionnaire_page_id?: number | null
  sort_order?: number
  visibility_condition?: AnyJsonRecord | null
}

export type UpdateQuestionnaireItem = {
  is_active?: boolean
  is_required?: boolean
  mapping_key?: string | null
  question_handle?: string
  question_id?: number
  question_version_id?: number | null
  sort_order?: number
  visibility_condition?: string[] | null
}

export type RequestUpdateQuestionnairePage = {
  description?: string | null
  image_url?: string | null
  section_header?: string | null
  sort_order?: number
  title?: string | null
}

export type RequestUpdateQuestionnaireQuestion = {
  is_active?: boolean
  is_required?: boolean
  mapping_key?: string
  question_version_id?: number
  questionnaire_page_id?: number
  sort_order?: number
  visibility_condition?: AnyJsonRecord | null
}

export type RequestQueryQuestionnaire = {
  offset?: number
  limit?: number
  filter?: {
    name?: string | FilterOperator
    handle?: string | FilterOperator
    description?: string | FilterOperator
    questionnaireable_type?: string | FilterOperator
    questionnaireable_id?: string | FilterOperator
    profile_id?: string | FilterOperator
    purpose?: string | FilterOperator
    is_active?: string | FilterOperator
    current_version_id?: string | FilterOperator
    meta?: string | FilterOperator
    search?: string
    search_with?: Record<string, string>
    custom_field?: Record<string, Record<string, string>>
    json_contains?: string
    [key: string]: any
  }
  sort?: string
  page?: {
    size?: number
    number?: number
  }
}

export type QuestionnaireQuestion = {
  created_at: string
  id: number
  is_active: boolean
  is_required: boolean
  mapping_key: string
  question: Question | null
  question_id: number
  question_version_id: number
  questionnaire_id: number
  questionnaire_page_id: number
  questionnaire_question_id: number
  sort_order: number | null
  updated_at: string
  version: QuestionVersion | null
  visibility_condition: AnyRecord | null
  visibility_dependencies: any[]
}

export type CreateQuestionnairePagesItem = {
  description?: string | null
  image_url?: string | null
  questions?: CreateQuestionnaireItem[] | null
  section_header?: string | null
  sort_order?: number
  title?: string | null
}

export type UpdateQuestionnairePagesItem = {
  description?: string | null
  image_url?: string | null
  questions?: UpdateQuestionnaireItem[] | null
  section_header?: string | null
  sort_order?: number
  title?: string | null
}

export type QuestionnaireQuestionResponse = {
  data: QuestionnaireQuestion[]
}

export type QuestionnairePage = {
  created_at: string
  description: string | null
  id: number
  image_url: string | null
  questionnaire_version_id: number
  questions: QuestionnaireQuestion[]
  section_header: string | null
  sort_order: number | null
  title: string | null
  updated_at: string
}

export type RequestCreateQuestionnaire = {
  description?: string | null
  handle?: string | null
  is_active?: boolean
  meta?: AnyJsonRecord | null
  name: string
  pages?: CreateQuestionnairePagesItem[] | null
  profile_id?: string | null
  purpose?: QuestionnairePurposeEnum
  questionnaireable_id?: string | null
  questionnaireable_type?: string | null
  questions?: CreateQuestionnaireItem[] | null
}

export type RequestUpdateQuestionnaire = {
  description?: string | null
  handle?: string | null
  is_active?: boolean
  meta?: AnyJsonRecord | null
  name?: string
  pages?: UpdateQuestionnairePagesItem[] | null
  profile_id?: string | null
  purpose?: QuestionnairePurposeEnum
  questionnaireable_id?: string | null
  questionnaireable_type?: string | null
  questions?: UpdateQuestionnaireItem[] | null
}

export type QuestionnairePageResponse = {
  data: QuestionnairePage[]
}

export type Questionnaire = {
  created_at: string
  description: string | null
  handle: string | null
  id: number
  is_active: boolean
  meta: AnyRecord | null
  name: string | null
  pages: QuestionnairePage[]
  profile_id: string
  purpose: QuestionnairePurposeEnum
  questionnaireable_id: number
  questionnaireable_type: string | null
  updated_at: string
}

export type QuestionnaireResponse = {
  data: Questionnaire[]
  meta?: PaginationMeta
  links?: PaginationLink
}

export type UserT = {
  avatarUrl: string
  id: string
  name: string
  evaluators: any
}

export type FeedbackTypeT = 'text' | 'multipleChoice' | 'scale'

export type FeedbackT = {
  id: string
  type: FeedbackTypeT
  answer: string | number
  evaluator: string
  evaluated: string
}

export type SetFeedbackT = {
  type: string
  payload: any
}

export type DispatchFeedbackContextT = any

export interface IOption {
  label: string
  value: number
}
export interface IAnswer {
  type: FeedbackTypeT | ''
  value: number | string
}

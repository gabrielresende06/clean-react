import { SurveyResultAnswerModel, SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

export namespace LoadSurveyResult {
  export type Model = SurveyResultModel
  export type Answer = SurveyResultAnswerModel
}

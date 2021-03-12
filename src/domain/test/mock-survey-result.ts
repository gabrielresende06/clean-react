import * as faker from 'faker'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.random.words(10),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: true
    },
    {
      answer: faker.random.words(2),
      count: faker.random.number(),
      percent: faker.random.number(100),
      isCurrentAccountAnswer: false
    }
  ]
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount: number = 0
  surveyResult = mockSurveyResultModel()

  async load (): Promise<LoadSurveyResult.Model> {
    this.callsCount++
    return this.surveyResult
  }
}

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10)
})

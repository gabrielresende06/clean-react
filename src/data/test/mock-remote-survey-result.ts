import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'
import * as faker from 'faker'

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => ({
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [{
    image: faker.internet.url(),
    answer: faker.random.words(),
    count: faker.random.number(),
    percent: faker.random.number(100)
  },
  {
    answer: faker.random.words(),
    count: faker.random.number(),
    percent: faker.random.number(100)
  }]
})

export const mockRemoteSurveyResultListModel = (): RemoteLoadSurveyResult.Model[] => ([
  mockRemoteSurveyResultModel(),
  mockRemoteSurveyResultModel(),
  mockRemoteSurveyResultModel()
])

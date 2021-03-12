import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'

const makeSut = (survey: LoadSurveyList.Model): void => {
  render(<SurveyItem survey={survey} />)
}

describe('Item Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2020-01-10T00:00:00')
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = false
    survey.date = new Date('2019-05-03T00:00:00')
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})

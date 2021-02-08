import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveyItem } from '@/presentation/pages/survey-list/components'
import { mockSurveyModel } from '@/domain/test'
import { SurveyModel } from '@/domain/models'
import { IconName } from '@/presentation/components'

const makeSut = (survey: SurveyModel): void => {
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
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = false
    survey.date = new Date('2019-05-03T00:00:00')
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})

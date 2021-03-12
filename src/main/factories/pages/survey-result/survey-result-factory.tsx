import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult } from '@/main/factories/usescases'
import { useParams } from 'react-router-dom'

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<any>()
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(`/surveys/${id}/results`)}/>
}

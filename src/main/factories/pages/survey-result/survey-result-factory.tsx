import React from 'react'
import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from '@/main/factories/usescases'
import { useParams } from 'react-router-dom'

export const makeSurveyResult: React.FC = () => {
  type Props = {
    id: string
  }
  const { id } = useParams<Props>()
  return <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(`/surveys/${id}/results`)}
      saveSurveyResult={makeRemoteSaveSurveyResult(`/surveys/${id}/results`)}
  />
}

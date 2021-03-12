import Styles from './survey-result-styles.scss'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import React, { useEffect, useState } from 'react'
import { SurveyResultContext, SurveyResultData } from '@/presentation/pages/survey-result/components'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(oldState => ({ ...oldState, surveyResult: null, error: error.message }))
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const onAnswer = (answer: string): void => {
    setState(oldState => ({
      ...oldState,
      isLoading: true
    }))
    saveSurveyResult.save({ answer })
      .then()
      .catch()
  }

  const reload = (): void => setState(oldState => ({ surveyResult: null, error: '', reload: !oldState.reload, isLoading: false }))
  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(oldState => ({ ...oldState, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
        <Header />
        <SurveyResultContext.Provider value={{ onAnswer }}>
          <div data-testid='survey-result' className={Styles.contentWrap}>
              { state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
              { state.isLoading && <Loading/>}
              { state.error && <Error error={state.error} reload={reload} />}
          </div>
        </SurveyResultContext.Provider>
        <Footer />
    </div>
  )
}

export default SurveyResult

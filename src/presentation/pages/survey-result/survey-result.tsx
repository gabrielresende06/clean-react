import { onSurveyAnswerState, SurveyResultData, surveyResultState } from '@/presentation/pages/survey-result/components'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import Styles from './survey-result-styles.scss'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(oldState => ({ ...oldState, surveyResult: null, isLoading: false, error: error.message }))
  })
  const [state, setState] = useRecoilState(surveyResultState)
  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)
  const onAnswer = (answer: string): void => {
    if (!state.isLoading) {
      setState(oldState => ({ ...oldState, isLoading: true }))
      saveSurveyResult.save({ answer })
        .then(surveyResult => setState(oldState => ({ ...oldState, surveyResult, isLoading: false })))
        .catch(handleError)
    }
  }

  const reload = (): void => setState(oldState => ({ surveyResult: null, error: '', reload: !oldState.reload, isLoading: false }))
  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(oldState => ({ ...oldState, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
        <Header />
        <div data-testid='survey-result' className={Styles.contentWrap}>
            { state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
            { state.isLoading && <Loading/>}
            { state.error && <Error error={state.error} reload={reload} />}
        </div>
        <Footer />
    </div>
  )
}

export default SurveyResult

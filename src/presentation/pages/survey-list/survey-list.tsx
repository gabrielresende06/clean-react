import React, { useEffect, useState } from 'react'
import Styles from './survey-list.scss'
import { Footer, Header } from '@/presentation/components'
import { SurveyContext, SurveyError, SurveyListItem } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(oldState => ({ ...oldState, error: error.message }))
  })

  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(oldState => ({ ...oldState, surveys })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
        <Header />
        <div className={Styles.contentWrap}>
            <h2>Enquetes</h2>
            <SurveyContext.Provider value={{ state, setState }}>
                {state.error ? <SurveyError /> : <SurveyListItem />}
            </SurveyContext.Provider>
        </div>
        <Footer />
    </div>
  )
}

export default SurveyList

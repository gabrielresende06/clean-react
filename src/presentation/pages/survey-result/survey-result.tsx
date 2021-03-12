import Styles from './survey-result-styles.scss'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import React, { useState } from 'react'
import FlipMove from 'react-flip-move'

type Props = {

}

const SurveyResult: React.FC<Props> = (props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })
  return (
    <div className={Styles.surveyResultWrap}>
        <Header />
        <div data-testid='survey-result' className={Styles.contentWrap}>
            { state.surveyResult &&
                <>
                    <hgroup>
                        <Calendar date={new Date()} className={Styles.calendarWrap} />
                        <h2>Qual é o seu framework web favorito? Qual é o seu framework web favorito? Qual é o seu framework web favorito?</h2>
                    </hgroup>
                    <FlipMove className={Styles.answersList}>
                        <li>
                            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" alt=""/>
                            <span className={Styles.answer}>ReactJS</span>
                            <span className={Styles.percent}>50%</span>
                        </li>
                    </FlipMove>
                    <button>Voltar</button>
                </>
            }
            { state.isLoading && <Loading/>}
            { state.error && <Error error={state.error} reload={() => {}} />}
        </div>
        <Footer />
    </div>
  )
}

export default SurveyResult

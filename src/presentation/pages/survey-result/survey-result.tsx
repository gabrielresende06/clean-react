import React from 'react'
import Styles from './survey-result-styles.scss'
import { Calendar, Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'

type Props = {

}

const SurveyResult: React.FC<Props> = (props) => {
  return (
    <div className={Styles.surveyResultWrap}>
        <Header />
        <div className={Styles.contentWrap}>
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
                <li className={Styles.active}>
                    <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" alt=""/>
                    <span className={Styles.answer}>ReactJS</span>
                    <span className={Styles.percent}>50%</span>
                </li>
                <li>
                    <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" alt=""/>
                    <span className={Styles.answer}>ReactJS</span>
                    <span className={Styles.percent}>50%</span>
                </li>
            </FlipMove>
            <button>Voltar</button>
            { true && <Loading/>}
        </div>
        <Footer />
    </div>
  )
}

export default SurveyResult

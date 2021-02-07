import React from 'react'
import Styles from './survey-list.scss'
import { Footer, Header } from '@/presentation/components'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

type Props = {

}

const SurveyList: React.FC<Props> = () => {
  return (
    <div className={Styles.surveyListWrap}>
        <Header />
        <div className={Styles.contentWrap}>
            <h2>Enquetes</h2>
            <ul>
                <SurveyItemEmpty />
            </ul>
        </div>
        <Footer />
    </div>
  )
}

export default SurveyList

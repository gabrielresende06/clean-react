import React from 'react'
import Styles from './survey-item-styles.scss'
import { Icon, IconName } from '@/presentation/components'

type Props = {

}

const SurveyItem: React.FC<Props> = () => {
  return (
      <li className={Styles.surveyItemWrap}>
          <div className={Styles.surveyContent}>
              <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
              <time>
                  <span className={Styles.day}>22</span>
                  <span className={Styles.month}>03</span>
                  <span className={Styles.year}>2020</span>
              </time>
              <p>Qual é o seu framework favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
      </li>
  )
}

export default SurveyItem

import React from 'react'
import Styles from './answer.scss'
import { LoadSurveyResult } from '@/domain/usecases'
import { onSurveyAnswerState } from '@/presentation/pages/survey-result/components'
import { useRecoilValue } from 'recoil'

type Props = {
  answer: LoadSurveyResult.Answer
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''
  const answerClick = (event: React.MouseEvent): void => {
    if (event.currentTarget.classList.contains(Styles.active)) {
      return
    }

    onAnswer(answer.answer)
  }
  return (
      <li
          data-testid='answer-wrap'
          className={[Styles.answerWrap, activeClassName].join(' ') }
          onClick={answerClick}
      >
          {answer.image && <img data-testid='image' src={answer.image} alt={answer.answer}/>}
          <span data-testid='answer' className={Styles.answer}>{answer.answer}</span>
          <span data-testid='percent' className={Styles.percent}>{answer.percent}%</span>
      </li>
  )
}

export default Answer

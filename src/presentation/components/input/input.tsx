import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'
import { LoginState } from '@/presentation/pages/login/login'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const state = useContext<LoginState>(Context)
  const error = state.errors[`${props.name}`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return error
  }

  return (
      <div className={Styles.inputWrap}>
        <input {...props} autoComplete="off" readOnly onFocus={enableInput} />
        <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>
            {getStatus()}
        </span>
      </div>
  )
}

export default Input

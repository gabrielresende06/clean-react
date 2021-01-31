import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, dispatch } = useContext(Context)
  const error = state.errors[`${props.name}`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    dispatch({ type: event.target.name, value: event.target.value })
  }

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return error || 'Tudo certo!'
  }

  return (
      <div className={Styles.inputWrap}>
        <input {...props} data-testid={`${props.name}`} autoComplete="off" readOnly onFocus={enableInput} onChange={handleChange} />
        <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>
            {getStatus()}
        </span>
      </div>
  )
}

export default Input

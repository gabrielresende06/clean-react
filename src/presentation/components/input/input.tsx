import React, { useContext, useRef } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, dispatch } = useContext(Context)
  const error = state.errors[`${props.name}`]
  const inputRef = useRef<HTMLInputElement>()

  return (
      <div className={Styles.inputWrap}>
        <input {...props}
               ref={inputRef}
               placeholder=" "
               data-testid={`${props.name}`}
               autoComplete="off"
               readOnly onFocus={event => { event.target.readOnly = false }}
               onChange={event => { dispatch({ type: event.target.name, value: event.target.value }) }} />
        <label onClick={() => { inputRef.current.focus() }}>{props.placeholder}</label>
        <span data-testid={`${props.name}-status`}
              title={error || 'Tudo certo!'}
              className={Styles.status}>
            {error ? '🔴' : '🟢'}
        </span>
      </div>
  )
}

export default Input

import React, { useRef } from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const error = state[`${props.name}Error`]
  const inputRef = useRef<HTMLInputElement>()

  return (
      <div data-testid={`${props.name}-wrap`}
          className={Styles.inputWrap}
          data-status={error ? 'invalid' : 'valid'}
      >
        <input {...props}
               ref={inputRef}
               title={error}
               placeholder=" "
               data-testid={`${props.name}`}
               autoComplete="off"
               readOnly onFocus={event => { event.target.readOnly = false }}
               onChange={event => { setState({ ...state, [event.target.name]: event.target.value }) }} />
        <label
            title={error}
            data-testid={`${props.name}-label`}
            onClick={() => { inputRef.current.focus() }}>
            {props.placeholder}
        </label>
      </div>
  )
}

export default Input

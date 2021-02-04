export type Errors = {
  message?: string
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export type State = {
  isLoading: boolean
  isFormInvalid: boolean
  name: string
  email: string
  password: string
  passwordConfirmation: string
  errors?: Errors
}

export type Action = { type: 'setLoading' | 'setFormIsInvalid', bool: boolean} |
{ type: 'name' | 'errorName' | 'email' | 'errorEmail' | 'password' | 'errorPassword' | 'passwordConfirmation' | 'errorPasswordConfirmation' | 'setMessage', value: string }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.value
      }
    case 'errorName':
      return {
        ...state,
        errors: { ...state.errors, email: action.value }
      }
    case 'email':
      return {
        ...state,
        email: action.value
      }
    case 'errorEmail':
      return {
        ...state,
        errors: { ...state.errors, name: action.value }
      }
    case 'password':
      return {
        ...state,
        password: action.value
      }
    case 'errorPassword':
      return {
        ...state,
        errors: { ...state.errors, password: action.value }
      }
    case 'passwordConfirmation':
      return {
        ...state,
        passwordConfirmation: action.value
      }
    case 'errorPasswordConfirmation':
      return {
        ...state,
        errors: { ...state.errors, passwordConfirmation: action.value }
      }
    case 'setMessage':
      return {
        ...state,
        errors: { ...state.errors, message: action.value }
      }
    case 'setLoading':
      return {
        ...state,
        isLoading: action.bool
      }
    case 'setFormIsInvalid':
      return {
        ...state,
        isFormInvalid: action.bool
      }
    default: return state
  }
}

import { State } from '@/presentation/types'

export type Action =
    { type: 'email' | 'password' | 'errorEmail' | 'errorPassword', value: string } |
    { type: 'setLoading', bool: boolean }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'email':
      return {
        ...state,
        email: action.value
      }
    case 'password':
      return {
        ...state,
        password: action.value
      }
    case 'errorEmail':
      return {
        ...state,
        errors: { ...state.errors, email: action.value }
      }
    case 'errorPassword':
      return {
        ...state,
        errors: { ...state.errors, password: action.value }
      }
    case 'setLoading':
      return {
        ...state,
        isLoading: action?.bool
      }
    default:
      return state
  }
}

export default reducer

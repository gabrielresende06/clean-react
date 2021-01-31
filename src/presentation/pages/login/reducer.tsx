import { State } from '@/presentation/types'

export type Action = { type: string, value: string }

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
    default:
      return state
  }
}

export default reducer

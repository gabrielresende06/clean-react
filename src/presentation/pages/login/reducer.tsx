import { State } from '@/presentation/types'

export type Action = { type: string, value: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'email':
      return {
        ...state,
        email: action.value
      }
    default:
      return state
  }
}

export default reducer

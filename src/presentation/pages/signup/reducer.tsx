export type Errors = {
  message?: string
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export type State = {
  isLoading: boolean
  name: string
  errors?: Errors
}

export type Action = { type: 'setLoading', bool: boolean} |
{ type: 'name' | 'errorName', value: string }

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
        errors: { ...state.errors, name: action.value }
      }
    default: return state
  }
}

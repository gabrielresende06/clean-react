export type Errors = {
  message?: string
  name?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export type State = {
  isLoading: boolean
  errors?: Errors
}

export type Action = { type: 'setLoading', bool: boolean}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    default: return state
  }
}

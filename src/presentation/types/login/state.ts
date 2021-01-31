import { Errors } from '@/presentation/types/login/errors'

export type State = {
  isLoading: boolean
  email: string
  errors?: Errors
}

import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from '@/presentation/hooks/use-logout'

type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const handleLogout = useLogout()
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      handleLogout()
    } else {
      callback(error)
    }
  }
}

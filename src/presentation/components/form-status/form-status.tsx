import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Context from '@/presentation/contexts/form/form-context'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)

  return (
      <div data-testid="error-wrap" className={Styles.errorWrap}>
        {state.isLoading && <Spinner className={Styles.spinner} />}
        {state.errors.message && <span data-testid='main-error' className={Styles.error}>{state.errors.message}</span>}
      </div>
  )
}

export default FormStatus

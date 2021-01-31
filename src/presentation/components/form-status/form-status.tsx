import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Context from '@/presentation/contexts/form/form-context'
import { LoginState } from '@/presentation/pages/login/login'

const FormStatus: React.FC = () => {
  const { isLoading, errors } = useContext<LoginState>(Context)

  return (
      <div data-testid="error-wrap" className={Styles.errorWrap}>
        {isLoading && <Spinner className={Styles.spinner} />}
          {errors.message && <span className={Styles.error}>{errors.message}</span>}
      </div>
  )
}

export default FormStatus

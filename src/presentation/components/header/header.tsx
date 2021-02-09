import React, { memo, useContext } from 'react'
import Styles from './header-styles.scss'
import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const handleLogout = useLogout()
  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    handleLogout()
  }
  return (
      <header className={Styles.headerWrap}>
          <div className={Styles.headerContent}>
              <Logo />
              <div className={Styles.logoutWrap}>
                  <span data-testid='username'>{getCurrentAccount().name}</span>
                  <a data-testid='logout' onClick={logout}>sair</a>
              </div>
          </div>
      </header>
  )
}

export default memo(Header)

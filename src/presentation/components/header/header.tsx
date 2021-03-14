import Styles from './header-styles.scss'
import { currentAccountState, Logo } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'

import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'

const Header: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
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

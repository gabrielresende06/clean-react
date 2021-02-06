import React, { memo } from 'react'
import Styles from './header-styles.scss'
import { Logo } from '@/presentation/components'

const Header: React.FC = () => {
  return (
      <header className={Styles.headerWrap}>
          <div className={Styles.headerContent}>
              <Logo />
              <div className={Styles.logoutWrap}>
                  <span>Gabriel Resende</span>
                  <a href="#">sair</a>
              </div>
          </div>
      </header>
  )
}

export default memo(Header)

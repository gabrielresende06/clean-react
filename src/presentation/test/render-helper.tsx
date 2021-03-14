import { currentAccountState } from '@/presentation/components'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

import { render, RenderResult } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { Router } from 'react-router-dom'
import { MemoryHistory } from 'history'
import React from 'react'

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  sut: RenderResult
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({ Page, history, account = mockAccountModel() }: Params): Result => {
  const setCurrentAccountMock = jest.fn()
  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }

  const sut = render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState)} >
        <Router history={history}>
            <Page />
        </Router>
    </RecoilRoot>
  )

  return { sut, setCurrentAccountMock }
}

import { Authentication } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: Authentication.Params
  callsCount: number = 0

  async auth (params: Authentication.Params): Promise<Authentication.Model | undefined> {
    this.params = params
    this.callsCount++
    return this.account
  }
}

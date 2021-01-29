import { AuthenticationParams } from '../usecases/authentication'
import * as faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

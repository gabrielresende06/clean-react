import { SaveAccessToken } from '@/domain/usecases'

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string
  async save (accessToken): Promise<void> {
    this.accessToken = accessToken
  }
}

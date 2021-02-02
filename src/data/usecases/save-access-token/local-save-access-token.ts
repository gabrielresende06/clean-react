import { SaveAccessToken } from '@/domain/usecases'
import { SetStorage } from '@/data/protocols/cache/set-storage'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) {
  }

  async save (accessToken): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}

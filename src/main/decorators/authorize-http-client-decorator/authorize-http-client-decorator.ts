import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import { GetStorage } from '@/data/protocols/cache'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) { }

  async request (data: HttpRequest): Promise<HttpResponse<any>> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }
    return await this.httpClient.request(data)
  }
}

import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { Authentication } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAuthentication = (uri: string): Authentication => {
  return new RemoteAuthentication(makeApiUrl(uri), makeAxiosHttpClient())
}

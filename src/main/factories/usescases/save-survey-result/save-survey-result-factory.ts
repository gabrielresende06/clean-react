import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { SaveSurveyResult } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/usescases/authorize-http-client-decorator/authorize-http-client-decorator-factory'
import { RemoteSaveSurveyResult } from '@/data/usecases'

export const makeRemoteSaveSurveyResult = (uri: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(makeApiUrl(uri), makeAuthorizeHttpClientDecorator())
}

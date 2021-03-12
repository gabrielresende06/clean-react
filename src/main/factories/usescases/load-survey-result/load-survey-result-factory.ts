import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { LoadSurveyResult } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/usescases/authorize-http-client-decorator/authorize-http-client-decorator-factory'
import { RemoteLoadSurveyResult } from '@/data/usecases'

export const makeRemoteLoadSurveyResult = (uri: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(uri), makeAuthorizeHttpClientDecorator())
}

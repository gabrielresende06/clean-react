import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { LoadSurveyResult } from '@/domain/usecases'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/usescases/authorize-http-get-client-decorator/authorize-http-get-client-decorator-factory'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

export const makeRemoteLoadSurveyResult = (uri: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(uri), makeAuthorizeHttpGetClientDecorator())
}

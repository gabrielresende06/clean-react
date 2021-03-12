import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/usecases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/usescases/authorize-http-client-decorator/authorize-http-client-decorator-factory'

export const makeRemoteLoadSurveyList = (uri: string): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl(uri), makeAuthorizeHttpClientDecorator())
}

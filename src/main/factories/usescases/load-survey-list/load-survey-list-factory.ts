import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/usecases'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/usescases/authorize-http-get-client-decorator/authorize-http-get-client-decorator-factory'

export const makeRemoteLoadSurveyList = (uri: string): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl(uri), makeAuthorizeHttpGetClientDecorator())
}

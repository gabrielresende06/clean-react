import React from 'react'
import Styles from './survey-list.scss'
import { Footer, Logo } from '@/presentation/components'

type Props = {

}

const SurveyList: React.FC<Props> = () => {
  return (
    <div className={Styles.surveyListWrap}>
        <header className={Styles.headerWrap}>
            <div className={Styles.headerContent}>
                <Logo />
                <div className={Styles.logoutWrap}>
                    <span>Gabriel Resende</span>
                    <a href="#">sair</a>
                </div>
            </div>
        </header>
        <div className={Styles.contentWrap}>
            <h2>Enquetes</h2>
            <ul>
                <li>
                    <div className={Styles.surveyContent}>
                        <time>
                            <span className={Styles.day}>22</span>
                            <span className={Styles.month}>03</span>
                            <span className={Styles.year}>2020</span>
                        </time>
                        <p>Qual é o seu framework favorito?</p>
                    </div>
                    <footer>Ver Resultado</footer>
                </li>
                <li>
                    <div className={Styles.surveyContent}>
                        <time>
                            <span className={Styles.day}>22</span>
                            <span className={Styles.month}>03</span>
                            <span className={Styles.year}>2020</span>
                        </time>
                        <p>Qual é o seu framework favorito?</p>
                    </div>
                    <footer>Ver Resultado</footer>
                </li>
                <li>
                    <div className={Styles.surveyContent}>
                        <time>
                            <span className={Styles.day}>22</span>
                            <span className={Styles.month}>03</span>
                            <span className={Styles.year}>2020</span>
                        </time>
                        <p>Qual é o seu framework favorito?</p>
                    </div>
                    <footer>Ver Resultado</footer>
                </li>
                <li>
                    <div className={Styles.surveyContent}>
                        <time>
                            <span className={Styles.day}>22</span>
                            <span className={Styles.month}>03</span>
                            <span className={Styles.year}>2020</span>
                        </time>
                        <p>Qual é o seu framework favorito?</p>
                    </div>
                    <footer>Ver Resultado</footer>
                </li>
                <li>
                    <div className={Styles.surveyContent}>
                        <time>
                            <span className={Styles.day}>22</span>
                            <span className={Styles.month}>03</span>
                            <span className={Styles.year}>2020</span>
                        </time>
                        <p>Qual é o seu framework favorito?</p>
                    </div>
                    <footer>Ver Resultado</footer>
                </li>
            </ul>
        </div>
        <Footer />
    </div>
  )
}

export default SurveyList

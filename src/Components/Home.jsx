import { useEffect } from 'react';

import DocumentTitle from 'react-document-title';
import Country from './HomeContent/Country';
import DeshJure from './HomeContent/DeshJure';
import DeshJureMobile from './HomeContent/DeshJureMobile';
import Econmics from './HomeContent/Econmics';
import EconmicsMobile from './HomeContent/EconmicsMobile';
import EducationMobile from './HomeContent/EducationMobile';
import Entertainment from './HomeContent/Entertainment';
import EntertainmentMobile from './HomeContent/EntertainmentMobile';
import Enviroment from './HomeContent/Enviroment';
import EnviromentMobile from './HomeContent/EnviromentMobile';
import Event from './HomeContent/Event';
import EventMobile from './HomeContent/EventMobile';
import Events from './HomeContent/Events';
import Feature from './HomeContent/Feature';
import FeatureMobile from './HomeContent/FeatureMobile';
import Foreign from './HomeContent/Foreign';
import HealthTalk from './HomeContent/HealthTalk';
import HealthTalkMobile from './HomeContent/HealthTalkMobile';
import International from './HomeContent/International';
import InternationalMobile from './HomeContent/InternationalMobile';
import Interview from './HomeContent/Interview';
import InterviewMobile from './HomeContent/InterviewMobile';
import Job from './HomeContent/Job';
import JobMobile from './HomeContent/JobMobile';
import Kobita from './HomeContent/Kobita';
import LawCourt from './HomeContent/LawCourt';
import LawCourtMobile from './HomeContent/LawCourtMobile';
import LeadNews from './HomeContent/LeadNews';
import Lifestyle from './HomeContent/Lifestyle';
import Opinion from './HomeContent/Opinion';
import Photos from './HomeContent/Photos';
import PhotosMobile from './HomeContent/PhotosMobile';
import Politics from './HomeContent/Politics';
import PoliticsMobile from './HomeContent/PoliticsMobile';
import Sahitto from './HomeContent/Sahitto';
import SahittoSlider from './HomeContent/SahittoSlider';
import ScienceAndTechnology from './HomeContent/ScienceAndTechnology';
import SpecialReport from './HomeContent/SpecialReport';
import SpecialReportMobile from './HomeContent/SpecialReportMobile';
import Sports from './HomeContent/Sports';
import SportsMobile from './HomeContent/SportsMobile';
import VideoHome from './HomeContent/VideoHome';
import VideoHomeMobile from './HomeContent/VideoHomeMobile';
import VideoLead from './HomeContent/VideoLead';
import HomeLdjsonBn from './HomeLdjsonBn';
// import CricketSeriesEvent from './HomeContent/CricketSeriesEvent';
import ReligionAndLife from './HomeContent/ReligionAndLife';
import EducationCampus from './HomeContent/EducationCampus'
import TodayDhaka from './HomeContent/TodayDhaka';


export default function Home() {

    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);


    }, [])
    return (
        <>
            <main>
                <DocumentTitle title='DeshKalNews.com | বাংলাদেশ ও বিশ্ব সংবাদ | সর্বশেষ খবর' />
                <HomeLdjsonBn />
                <Events />
                <LeadNews />
                <div className="DTopNewsBottomSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 border-right-inner" >
                                <VideoLead />
                            </div>
                            <div className="col-lg-3">
                                <div className="MblHide">
                                    <Interview />
                                </div>
                                <div className="MblShow">
                                    <PoliticsMobile />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="rajniti-orthiniti-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 border-right-inner">
                                <div className="MblHide">
                                    <Politics />
                                </div>
                                <div className="MblShow">
                                    <InterviewMobile />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="MblHide">
                                    <Econmics />
                                </div>
                                <div className="MblShow mt-3">
                                    <EconmicsMobile />
                                </div>

                            </div>
                        </div>
                        <div className="MblShow">
                            <LawCourtMobile />
                        </div>

                    </div>
                </section>
                <section className="sports-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="MblHide">
                                    <Sports />
                                </div>
                                <div className="MblShow">
                                    <SportsMobile />
                                </div>

                            </div>
                            <div className="col-lg-3">
                                {/* <Link to="/tags/বাংলাদেশ-শ্রীলঙ্কা সিরিজ" onClick={scrollTop}>
                                    <div className="cricket-series-banner">
                                        <img src={CricketSeries} alt="" className="img-fluid" />
                                    </div>
                                </Link> */}
                                { /* <CricketSeriesEvent />*/}
                                <div className="MblHide">
                                    {/* <Education /> */}
                                    {/* <LawCourt /> */}
                                    <div className="mt-3">
                                        <LawCourt />
                                        <EducationCampus />
                                    </div>
                                </div>
                                <div className="MblShow">
                                    <EducationMobile />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="MblHide">
                    <Entertainment />
                </div>
                <div className="MblShow">
                    <EntertainmentMobile />
                </div>

                <section className="Feature-science-tech-area-news">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 border-right-inner">
                                <div className="MblHide">
                                    <Feature />
                                </div>
                                <div className="MblShow">
                                    <FeatureMobile />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <ScienceAndTechnology />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="TopSpeclNews">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 border-right-inner">
                                <div className="MblHide">
                                    <SpecialReport />
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <ReligionAndLife />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="MblShow">
                    <SpecialReportMobile />
                </div>

                <Opinion />
                <div className="MblHide">
                    <Photos />
                </div>
                <div className="MblShow">
                    <PhotosMobile />
                </div>

                <div className="container">
                    <section className="health-bissho-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 border-right-inner">
                                    <div className="MblHide">
                                        <HealthTalk />
                                    </div>
                                    <div className="MblShow">
                                        <HealthTalkMobile />
                                    </div>

                                </div>
                                <div className="col-lg-6">
                                    <Lifestyle />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="MblHide">
                        <DeshJure />
                    </div>
                    <div className="MblShow">
                        <DeshJureMobile />
                    </div>
                    <section className="saradesh-area-job">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 border-right-inner">
                                    <Country />
                                </div>
                                <div className="col-lg-3">
                                    <div className="MblHide">
                                        <Job />
                                    </div>
                                    <div className="MblShow">
                                        <JobMobile />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="sahitto-kobita">
                        <div className="container">
                            <div className="row mb-4">
                                <div className="col-lg-9 border-right-inner">
                                    <Sahitto />
                                </div>
                                <div className="col-lg-3">
                                    <Kobita />
                                </div>
                            </div>

                        </div>
                        <SahittoSlider />
                    </section>
                    <section className="multiple-news-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 border-right-inner">
                                    <div className="MblHide">
                                        <Enviroment />
                                    </div>
                                    <div className="MblShow">
                                        <EnviromentMobile />
                                    </div>

                                </div>
                                <div className="col-lg-6  ">
                                    <div className="row">
                                        <div className="col-lg-6 border-right-inner  MblHide">
                                            <Event />

                                        </div>
                                        <div className="col-lg-6">
                                            <TodayDhaka />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="MblShow">
                                <EventMobile />
                            </div>
                        </div>
                    </section>
                    <section className="lifestyle-Probash">
                        <div className="container">
                            <div className="row mb-4">
                                <div className="col-lg-9 border-right-inner">
                                    <div className="MblHide">
                                        <International />
                                    </div>
                                    <div className="MblShow">
                                        <InternationalMobile />
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <Foreign />
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
                <div className="MblHide">
                    <VideoHome />
                </div>
                <div className="MblShow">
                    <VideoHomeMobile />
                </div>

            </main >

        </>
    )
}

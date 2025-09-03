import { useState } from 'react';
import { FaPlay } from "react-icons/fa";
import { Link } from 'react-router-dom';


const toBengaliNumber = (number) => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
        .toString()
        .split("")
        .map(digit => bengaliDigits[parseInt(digit)])
        .join("");
};

export default function LatestPopular({generateLatest, generatePopular}) {

    const [activeTab, setActiveTab] = useState('tabs-1');

    const handleTabClick = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    // const latest = await getApi(`home-json-bn/generateLatest.json`)
    // // console.log(latest);

    // const generateLatest = latest.slice(0, 10)
    // const popular = await getApi(`home-json-bn/generatePopular.json`)
    // console.log(popular);

    // const generatePopular = popular.slice(0, 10)
    // console.log(generatePopular);


    // if (generateLatest && generatePopular) {

        return (
            <>
                <div className="DLPSTab2">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${activeTab === 'tabs-1' ? 'active' : ''}`}
                                        data-bs-toggle="tab"
                                        href="#tabs-1"
                                        role="tab"
                                        tabIndex="-1"
                                        aria-selected={activeTab === 'tabs-1'}
                                        onClick={() => handleTabClick(Event, 'tabs-1')}
                                    >সর্বশেষ</a>
                                    {/* <Link className="nav-link active" data-bs-toggle="tab" href="#tabs-1" role="tab" tabIndex="-1"
                                        aria-selected="true">সর্বশেষ</Link> */}
                                </li>
                                <li className="nav-item">
                                <a
                                    className={`nav-link ${activeTab === 'tabs-2' ? 'active' : ''}`}
                                    data-bs-toggle="tab"
                                    href="#tabs-2"
                                    role="tab"
                                    tabIndex="-1"
                                    aria-selected={activeTab === 'tabs-2'}
                                    onClick={() => handleTabClick(Event, 'tabs-2')}
                                    >
                                    সর্বাধিক পঠিত
                                </a>
                                    {/* <Link className="nav-link" data-bs-toggle="tab" href="#tabs-2" role="tab" tabIndex="-1"
                                        aria-selected="false">সর্বাধিক পঠিত</Link> */}
                                </li>
                            </ul>
                        </div>
                        <div className="panel-body PanelHeight">
                            <div className="tab-content">
                                <div className={`tab-pane ${activeTab === 'tabs-1' ? 'active' : ''}`} id="tabs-1" role="tabpanel">
                                    <div className="DLatestNews longEnough mCustomScrollbar" data-mcs-theme="dark">
                                        {generateLatest && generateLatest.map((nc, i) => {
                                            return (
                                                <div className="DLatestNewsList" key={nc.ContentID}>
                                                    <Link to={"/details/" + nc.categorySlug + "/" + nc.ContentID}>
                                                        <div className="row">
                                                            <div className="col-lg-2">
                                                                <div className="d-flex  align-items-center"><span>{toBengaliNumber(i + 1)}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 d-lg-none">
                                                                <div className="tabImage">
                                                                    <picture>
                                                                        <img src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" />
                                                                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /> </div>}
                                                                    </picture>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-10 col-7">
                                                                <p>{nc.DetailsHeading}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })}


                                    </div>
                                </div>
                                <div className={`tab-pane ${activeTab === 'tabs-2' ? 'active' : ''}`} id="tabs-2" role="tabpanel">
                                    <div className="DLatestNews longEnough mCustomScrollbar" data-mcs-theme="dark">
                                        {generatePopular && generatePopular.map((nc, i) => {
                                            return (
                                                <div className="DLatestNewsList" key={nc.ContentID}>
                                                    <Link to={"/details/" + nc.categorySlug + "/" + nc.ContentID}>
                                                        <div className="row">
                                                            <div className="col-lg-2">
                                                                <div className="d-flex  align-items-center"><span>{toBengaliNumber(i + 1)}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 d-lg-none">
                                                                <div className="tabImage">
                                                                    <picture>
                                                                        <img src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" />
                                                                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /> </div>}
                                                                    </picture>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-10 col-7">
                                                                <p>{nc.DetailsHeading}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    // }
    // else{
    //     <NotFound />
    // }

}

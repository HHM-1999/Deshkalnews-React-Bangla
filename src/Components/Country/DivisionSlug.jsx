import axios from 'axios';
import { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { Link, useParams } from "react-router-dom";
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';
import DivisionDistricName from './DivisionDistricName';
// import LatestPopularNews from '../Category/LatestPopularNews';
// import LeadLatestNews from '../HomeContent/LeadLatestNews';
// import RLoader from '../RLoader';
// import RLoader from '../RLoader';
var lazyloaded = false
var limit = 10
export default function DivisionSlug() {
    const [divisionName, setDivisionName] = useState('')

    // const [isLoading, setisLoading] = useState(true)
    const [division, setDivision] = useState([])
    let { divisionSlug } = useParams();
    useEffect(() => {
        // setisLoading(true)
        window.scrollTo(0, 0)
        axios
            .get(`${process.env.REACT_APP_API_URL}division-district-contents/${divisionSlug}/${limit}`)
            .then(({ data }) => {
                // setisLoading(false)
                if (data.data.length !== 0) {
                    setDivisionName(data.divisionNameBn);
                    setDivision(data.data);
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                } else {
                    setDivision(null);
                }
            })
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
    }, [divisionSlug])

    return (

            <>
                {divisionName ?
                    <main>

                        <div className="container">
                            <div className="TopHomeSection"></div>
                            <div className="DTitle">
                                <DocumentTitle title={divisionName} />
                                <Link to={+ '/'}><div className="DTitleInner"><h1 className="DTitleInnerBar">{divisionName}</h1></div></Link>
                            </div>
                            <div className="row">
                                <div className="col-lg-9 col-sm-12 border-right-inner1">
                                    <DivisionDistricName />
                                    <div className="DivisionAllNews">
                                        <div className="row">
                                            {division.map((nc, i) => {
                                                return (
                                                    <div className="col-lg-4 col-sm-12" key={i}>
                                                        <div className="Division-panel">
                                                            <div className="DivisionHeader">
                                                                <Link to={`/divisions/${divisionSlug}` + '/' + nc.districtSlug} onClick={scrollTop}>
                                                                    {nc.districtNameBn}
                                                                </Link>
                                                            </div>
                                                            {nc.districtContents.slice(0,5)?.map((nd, i) => {
                                                                return (
                                                                    <div className="DivisionBody" key={i}>
                                                                        {i === 0 ?
                                                                            <div className="DivisionLeadNews">
                                                                                <Link rel="preload" as="image" to={"/country" + "/" + nd.ContentID} onClick={scrollTop}>
                                                                                    <div className="DImgBlock card-video-part">
                                                                                        <div className="DImgZoomBlock">
                                                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nd.ImageBgPath} alt={nd.DetailsHeading} title={nd.DetailsHeading} fetchpriority="high" style={{width: "100%", height:"auto"}} /></picture>
                                                                                            {nd.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="Desc">
                                                                                        <h2 className="Title">{nd.DetailsHeading}</h2>
                                                                                    </div>
                                                                                </Link>
                                                                            </div> :
                                                                            <div className="DivisionListNews">
                                                                                <Link to={"/" + divisionSlug + "/" + nd.ContentID} onClick={scrollTop}>
                                                                                    <div className="Desc">
                                                                                        <h3 className="Title">
                                                                                            {nd.DetailsHeading}
                                                                                        </h3>
                                                                                    </div>
                                                                                </Link>
                                                                            </div>}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-lg-3 col-sm-12">
                                    <div className="MarginBottom30">
                                   
                                        <div className="DRightSideAdd d-flex justify-content-center mb-3">
                                            <img src="/media/Advertisement/Advertisement (300X250).png" alt="Advertisement" title="Advertisement" />
                                        </div>

                                    </div>
                                </div> */}
                            </div>
                        </div>

                    </main>
                    : false}
            </>
    )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import DocumentTitle from 'react-document-title';
import { scrollTop, ForLazyLoaderImg, formatDateToBengali } from '../AllFunctions'
import ErrorPage from '../ErrorPage';
import Header from '../Header';
import FooterAd from '../../FooterAds';
// import LatestPopularNews from '../Category/LatestPopularNews';
// import LeadLatestNews from '../HomeContent/LeadLatestNews';
// import RLoader from '../RLoader';
// import RLoader from '../RLoader';

var lazyloaded = false
var limit = 10
var offset = 0
// var LeadNewsLimit = 10
var formData = []
export default function SubDistrictSlug() {
    const [isLoading, setisLoading] = useState(true)
    const [subDistrictName, setSubDistrictName] = useState('')
    const [subDistrictContentList, setSubDistrictContentList] = useState([])
    // let { divisionSlug } = useParams();
    let { divisionSlug, districtSlug, subDistrictSlug } = useParams();
    const [showMore, setShowMore] = useState(true);
    useEffect(() => {
        setisLoading(true)
        window.scrollTo(0, 0)
        offset = 0
        // axios
        //     .get(`${process.env.REACT_APP_API_URL}district-division-content/${divisionSlug}/${districtSlug}`)
        //     .then(({ data }) => {



        // let positionLength = data.districtContent.content.length
        // formData = { 'DistrictID': Did, 'limit': LeadNewsLimit - data.districtContent.content.length, 'offset': 0, 'InnerSpecialContents': InnerSpecialContents }
        formData = { 'subDistrictSlug': subDistrictSlug, 'limit': limit, 'offset': offset };
        axios
            .post(`${process.env.REACT_APP_API_URL}sub-district-contents`, formData)
            .then(({ data }) => {
                // console.log(data);
                setisLoading(false)

                if (data.subDistrictNameBn) {
                    setSubDistrictName(data.subDistrictNameBn)
                    setSubDistrictContentList(data.contents)

                    if (data.contents.length < limit) {
                        setShowMore(false)
                    }

                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
                // console.log(setSubDistrictName + "hlll");

                // for (let i = 0; i < data.length; i++) {
                //     setSubDistrictContentList(oldArray => [...oldArray, data[i]]);

                // }
                // offset += data.length
                // if (data.length < LeadNewsLimit) {
                //     setShowMore(false)
                // }
                // setTimeout(function () {
                //     lazyloaded = false
                //     ForLazyLoaderImg(lazyloaded)
                // }, 1000);

            });

        // InnerSpecialContents = InnerSpecialContents + ``
        // leadNews position array ------ end

        // })
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
    }, [districtSlug, subDistrictSlug])

    const toggleButtonState = (e) => {

        e.preventDefault();
        offset += limit
        setShowMore(true)
        // top_content_ids = []
        // top_content_ids = news.map(function (el) { return el.ContentID; });
        formData = { 'subDistrictSlug': subDistrictSlug, 'limit': limit, 'offset': offset };
        axios
            .post(`${process.env.REACT_APP_API_URL}sub-district-contents`, formData)
            .then(({ data }) => {
                if (data.contents.length < limit) {
                    // console.log(data.data);
                    setShowMore(false)
                    // showMore = false
                }
                // if (data.length == null) {
                //     document.getElementById("btnDiv").style.display = "none"
                // }
                for (let i = 0; i < data.contents.length; i++) {
                    setSubDistrictContentList(oldArray => [...oldArray, data.contents[i]]);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            }

            );

    };

    return (
        <>
            <div className="adsArea AdsHide text-center">
                <img src={"/media/Advertisement/Advertisement(970X90).png"} alt="" className="img-fluid" />
            </div>
            <div className='adsArea text-center'>
                <img src="/media/Advertisement/advertisement-320x100.png" alt="" title="" className="mbAds"></img>
            </div>
            <Header />
            <FooterAd />
            {!isLoading ? <>
                {subDistrictName ?
                    <main>

                        <div className="container">
                            <div className="TopHomeSection"></div>
                            <div className="DTitle">
                                <DocumentTitle title={subDistrictName} />
                                <Link to={+"/"}><div className="DTitleInner"><h1 className="DTitleInnerBar">{subDistrictName}</h1></div></Link>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 col-sm-12 border-right-inner1">

                                    <div className="DivisionAllNews mt-3">
                                        <div className="row">
                                            {subDistrictContentList ? subDistrictContentList.map((nc) => {
                                                return (
                                                    <div className="col-lg-6 col-sm-12">
                                                        <div className="Division-panel">
                                                            <div className="DistrictListNews">
                                                                <Link to={"/" + districtSlug + "/" + nc.ContentID} onClick={scrollTop}>
                                                                    <div className="row">
                                                                        <div className="col-lg-5 col-sm-4 col-5 card-video-part">
                                                                            <div className="DImgZoomBlock">
                                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} /></picture>
                                                                                {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-7 col-sm-8 col-7">
                                                                            <div className="Desc">
                                                                                <h3 className="Title">{nc.DetailsHeading}</h3>
                                                                            </div>
                                                                            <p className="pDate">{formatDateToBengali(nc.created_at)}</p>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }) : ""}
                                        </div>
                                    </div>
                                    {showMore ?
                                        <div id="btnDiv" className="text-center mt-2 mb-4">
                                            <button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>
                                                আরো পড়ুন
                                            </button>
                                        </div>
                                        : false}
                                </div>
                                {/* <div className="col-lg-3 col-sm-12">
                                <div className="MarginBottom30">
                                <LeadLatestNews />
                                </div>
                            </div> */}
                            </div>
                        </div>

                    </main>
                    : <ErrorPage />}
            </> : ''} </>
    )
}

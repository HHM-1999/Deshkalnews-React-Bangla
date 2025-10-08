import axios from 'axios';
import { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { Link, useParams } from "react-router-dom";
import { ForLazyLoaderImg, formatDateToBengali, scrollTop } from '../AllFunctions';

var lazyloaded = false
var limit = 10
var offset = 0

var formData = []
export default function DistrictSlug() {
    const [districtName, setDistrictName] = useState('')
    const [districtContentList, setDistrictContentList] = useState([])
    let {  districtSlug } = useParams();
    const [showMore, setShowMore] = useState(true);
    useEffect(() => {
        // setisLoading(true)
        window.scrollTo(0, 0)
        offset = 0
        formData = { 'districtSlug': districtSlug, 'limit': limit, 'offset': offset };
        axios
            .post(`${process.env.REACT_APP_API_URL}district-contents`, formData)
            .then(({ data }) => {
                // setisLoading(false)
                if (data.districtNameBn) {
                    setDistrictName(data.districtNameBn)
                    setDistrictContentList(data.contents)
                    if (data.contents.length < limit) {
                        setShowMore(false)
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);
    }, [districtSlug])

    const toggleButtonState = (e) => {

        e.preventDefault();
        offset += limit
        setShowMore(true)
        // top_content_ids = []
        // top_content_ids = news.map(function (el) { return el.ContentID; });
        formData = { 'districtSlug': districtSlug, 'limit': limit, 'offset': offset };
        axios
            .post(`${process.env.REACT_APP_API_URL}district-contents`, formData)
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
                    setDistrictContentList(oldArray => [...oldArray, data.contents[i]]);
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
            {/* {!isLoading ? */}

            <>
                {districtName ?
                    <main>

                        <div className="container">
                            <div className="TopHomeSection"></div>
                            <div className="DTitle">
                                <DocumentTitle title={districtName} />
                                <Link to={+"/"}><div className="DTitleInner"><h1 className="DTitleInnerBar">{districtName}</h1></div></Link>
                            </div>
                            {/* <SubDistrictNames divisionSlug={divisionSlug} districtSlug={districtSlug} /> */}

                            <div className="row">
                                <div className="col-lg-12 col-sm-12 border-right-inner1">

                                    <div className="DivisionAllNews mt-3">
                                        <div className="row">
                                            {districtContentList ? districtContentList.map((nc) => {
                                                return (
                                                    <div className="col-lg-6 col-sm-12" key={nc.ContentID}>
                                                        <div className="Division-panel">
                                                            <div className="DistrictListNews">
                                                                <Link rel="preload" as="image" to={"/country" + "/" + nc.ContentID} onClick={scrollTop}>
                                                                    <div className="row">
                                                                        <div className="col-lg-5 col-sm-4 col-5 card-video-part">
                                                                            <div className="DImgZoomBlock">
                                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" style={{width: "100%", height:"auto"}} /></picture>
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
                    : false}
            </>
        </>
    )
}

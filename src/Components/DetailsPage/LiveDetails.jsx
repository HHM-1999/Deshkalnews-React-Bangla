import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import DocumentTitle from 'react-document-title'
import { banglaDateConvetar, formatDateToBengali, timeAgo } from '../AllFunctions'
import DWriters from './DWriters'
import DSocialShare from './DSocialShare'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { toBengaliNumber } from 'bengali-number'

// var lazyloaded = false
var dataCalled = false // for once call function
export default function LiveDetails() {
    let { id } = useParams()
    const [LeadData, setLeadData] = useState([])
    console.log(formatDateToBengali(LeadData.created_at));
    const [count, setcount] = useState([])
    // const [content, setcontent] = useState([])
    const [writer, setWriter] = useState([]);

    useEffect(() => {
        // axios
        //     .get(`${process.env.REACT_APP_API_URL}live-content-details/${id}`)
        //     .then(({ data }) => {
        //         if (data.data.length > 0) {
        //             setLeadData(data.data);
        //             setWriter(data.data[0].WriterName)
        //             setTimeout(function () {
        //                 lazyloaded = false
        //                 ForLazyLoaderImg(lazyloaded)
        //             }, 1000);
        //         }
        //     });
        if (!dataCalled) {
            dataCalled = true
            axios
                .get(`${process.env.REACT_APP_API_URL}live-content-details/${id}`)
                .then(({ data }) => {
                    dataCalled = false
                    if (data.data) {
                  

                        setLeadData(data.data);
                        setcount(data.data.content_liveblogs)


                      
                        setWriter(data.data.content_contributors)
                    } else setLeadData("");
                });
        }


    }, [id])

    return (
        <>
            {LeadData ?
                <main>
                    <DocumentTitle title={LeadData.DetailsHeading} />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="detailPage">
                                    <div className="live-title-wrap">
                                        <div className="LiveButton-title">
                                            <div className="LiveButton">
                                                <div className="circle--outer"></div>
                                                <div className="circle--inner"></div>
                                            </div>
                                            <h3 className='liveTitle'>
                                                লাইভ আপডেট
                                            </h3>

                                        </div>
                                    </div>
                                    {LeadData.ContentSubHeading === null || LeadData.ContentSubHeading === undefined ?
                                        <h1 className="Title">{LeadData.DetailsHeading}</h1> :
                                        <h1 className="Title"> <span className="subHeading">{LeadData.ContentSubHeading + " / "}</span> {LeadData.DetailsHeading}</h1>
                                    }
                                    <div className="Brief">
                                        <p>{LeadData.ContentBrief}</p>
                                    </div>
                                    <div className=" mb-2  mt-4 d-contents d-sm-flex justify-content-between align-items-center d-print-none">
                                        <div>
                                            <DWriters writer={writer} news={LeadData} />
                                            <p className="pDate "><span>প্রকাশিত:</span> {formatDateToBengali(LeadData.created_at)}</p>
                                        </div>

                                        <div className='d-flex PRINTBTN mb-2'>
                                            <p className="DTopImgCaption" style={{ paddingRight: '10px', paddingTop: '10px' }}>{LeadData.create_date && banglaDateConvetar(format(new Date(LeadData.create_date), 'dd MMMM yyyy, H:mm'))}</p>

                                            <DSocialShare title={LeadData.DetailsHeading} contentID={LeadData.ContentID} />
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-6">
                                <div className="detailIMG">
                                    {LeadData.VideoID !== null && LeadData.VideoID !== '' && LeadData.ShowVideo === 1 ?
                                        <>
                                            <div className={"col-sm-12 video-container mt-2"}>
                                                {LeadData.VideoType === "youtube" ?
                                                    <iframe className="embed-responsive-item pb-3" title="youtube-video" src={"https://www.youtube.com/embed/" + LeadData.VideoID + "?autoplay=1"} frameBorder="0" webkitallowFullScreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                                    : LeadData.VideoType === "vimeo" ?
                                                        <iframe src={"https://player.vimeo.com/video/" + LeadData.VideoID} title="vimeo-video" frameBorder="0" webkitallowFullScreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                                        : LeadData.VideoType === "facebook" ?
                                                            <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + LeadData.VideoID + "%2F&show_text=0&width=560"} title="facebook-video" width="560" height="315" style={{ border: "none", overflow: "hidden", paddingBottom: '1rem' }} scrolling="no" frameBorder="0" allowFullScreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                                            : LeadData.VideoType === "instagram" ?
                                                                <iframe className="embed-responsive-item pb-3" title="instagram-video" src={"//instagram.com/p/" + LeadData.VideoID + ">/embed"} width="100%" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                                                : false}
                                            </div>
                                        </> :
                                        <div className="LeadImage Imgresize">
                                            {LeadData.ImageBgPath == null ?
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={LeadData.DetailsHeading} title={LeadData.DetailsHeading} fetchpriority="high" className="img-fluid img100" /> :
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + LeadData.ImageBgPath} alt={LeadData.DetailsHeading} title={LeadData.DetailsHeading} fetchpriority="high" className="img-fluid img100" />}

                                            {LeadData.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                        </div>
                                    }
                                </div>

                            </div>
                            <div className="row mt-5">
                                <div className="col-lg-8">
                                    <div className="separator"></div>
                                    <div className="auto-update-wrapper">
                                        <span className='title'><div className="SquareIcon"></div>{toBengaliNumber(count.length)}টি আপডেট</span>
                                    </div>
                                    <ul className='liveupdateList'>
                                        {count.map((nc) => {
                                            console.log(nc.created_at)
                                            return (
                                                <li className='newsfeed'>
                                                    <div className="liveUpdates">
                                                        <div className="card-live__icon"><svg className="icon icon--live-orange icon--primary icon--20 " viewBox="0 0 20 20" version="1.1" aria-hidden="true"><title>live-orange</title><g><circle cx="10" cy="10" r="9" stroke="#db0303" stroke-width="1.68" fill="#ffffff"></circle><circle cx="10" cy="10" r="5" fill="#db0303"></circle></g></svg></div>
                                                        <div className="card-live__last-updated"><div className="date-relative">{timeAgo(nc.created_at	) }</div></div>
                                                    </div>
                                                    <div className="card-live__content-area">
                                                        <h2 className="Title">{nc.BlogTitle}</h2>
                                                        <div className={'ContentDetails page-break' + nc.ContentID} id={`contentDetails`}>

                                                            <div dangerouslySetInnerHTML={{ __html: nc.BlogBody }} id={`contentDetails ContentDetails${nc.ContentID}`} key={nc.ContentID}></div>


                                                        </div>

                                                    </div>
                                                </li>
                                            )
                                        })}

                                    </ul>

                                </div>
                            </div>



                        </div>
                    </div>
                </main>

                : false}
        </>
    )
}

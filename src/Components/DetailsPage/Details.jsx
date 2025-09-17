import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
// import { format } from 'date-fns'
import { ForLazyLoaderImg, scrollTop, timeAgo, formatDateToBengali24 } from '../AllFunctions'
import ErrorPage from '../ErrorPage'
// import DFrom from './DFrom'
import DSocialShare from './DSocialShare'
import Ldjson from './Ldjson'
import { FaPrint, FaTag } from 'react-icons/fa'
import DCatLatest from './DCatLatest'
import DfbComment from './DfbComment'
import DCatPopular from './DCatPopular'
import DWriters from './DWriters'
import DocumentTitle from 'react-document-title'
import favicon from '../../assets/media/common/favicon.png'
import { toBengaliNumber } from 'bengali-number'
import innerAds from '../../assets/media/Advertisement/300 x250 - Details.jpg'
// import topAds from '../../assets/media/Advertisement/970 x 90 -details.jpg'
    import Ads from '../../assets/media/Advertisement/300 x250 - Details.jpg';
var lazyloaded = false
var dateArray = []
var allTags
var contentInner
var catID
var DisplayCatName
var nextNewsIDs = []
var ajaxLoading = false;
var maxNews = 0;
var contentLoaded = false
var dataCalled = false // for once call function

var R_ContentData = []
export default function Details() {
    let { catSlug, id } = useParams()
    const [LeadData, setLeadData] = useState([])
    const [count, setcount] = useState([])
    const [catName, setCatName] = useState([])
    const [state, setState] = useState([])
    const [catLatest, setCatLatest] = useState([])
    const [catPopular, setCatPopular] = useState([])
    const [heading, setHeading] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [fontSize, setFontSize] = useState(20);
    const PrintAble = () => { window.print(); };
    
    useEffect(() => {
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // setTimeout(() => { window.location.reload(1); }, 300000);
        // setLoading(true);
        // setTimeout(() => { setisLoading(false) }, 300);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        contentLoaded = false
        axios
            .get(`${process.env.REACT_APP_API_URL}category/${catSlug}`)
            .then(({ data }) => {
                if (data.category !== null) {
                    // setisLoading(false)
                    // setLoading(false);
                    catID = data.category.CategoryID
                    DisplayCatName = data.category.DisplayCatName
                    try {
                        axios
                            .get(`${process.env.REACT_APP_API_URL}category-latest-content/${catID}/4`)
                            .then(({ data }) => {
                                setCatLatest(data.data);
                            });
                    }
                    catch {
                        console.log(console.error);
                    }
                    try {
                        axios
                            .get(`${process.env.REACT_APP_API_URL}category-popular-content/${catID}/4`)
                            .then(({ data }) => {
                                setCatPopular(data.data.slice(0, 4));
                            });
                    }
                    catch {
                        console.log(console.error);
                    }
                }
            });
        if (!dataCalled) {
            dataCalled = true
            axios
                .get(`${process.env.REACT_APP_API_URL}content-details/${id}`)
                .then(({ data }) => {
                    dataCalled = false
                    if (data.data.length > 0) {
                        if (id !== data.data[0].contentID) {
                            // console.log(data.data);

                            setState(data.data[0]);

                            document.title = data.data[0].DetailsHeading;
                            setCatName(data.data[0].CategoryName);
                            setTimeout(function () {
                                contentLoaded = true
                                lazyloaded = false
                                ForLazyLoaderImg(lazyloaded)
                            }, 1000);
                            setTimeout(function () {
                                inner_Caption(data.data[0].ContentID)
                                // ineerRelatedNews(data.data[0].ContentID)
                            }, 400);
                            if (data.data[0].created_at) {
                                dateArray = [data.data[0].created_at]
                            } else {
                                dateArray = [[]]
                            }
                            allTags = data.data[0].Tags
                            contentInner = data.data[0].ContentDetails

                            setHeading(data.data[0].DetailsHeading)
                            // console.log(setWriter);
                            if (data.data[0].RelNewsIDs) {
                                // axios
                                //     .get(`${process.env.REACT_APP_API_URL}related-news/${id}`)
                                //     .then(({ data }) => {
                                R_ContentData['id' + id] = data.data[0].relatedNewslist;
                                // });
                            }
                        }
                    } else setState(null);
                });

            axios
                .get(`${process.env.REACT_APP_API_URL}live-content-details/${id}`)
                .then(({ data }) => {
                    dataCalled = false
                    if (data.data) {
                        setLeadData(data.data);
                        setcount(data.data.content_liveblogs)
                        // setWriter(data.data.content_contributors)
                    } else setLeadData("");
                });
        }
        const handleScroll = () => {
            if (contentLoaded) {
                var counter = document.getElementsByClassName("newsDetail").length - 1;
                if (counter >= 0) {
                    // var elmnt = document.getElementsByClassName("newsDetail")[counter];
                    // if (window.pageYOffset + 200 > (elmnt.offsetHeight + elmnt.offsetTop) - window.innerHeight && !ajaxLoading && counter + 1 < maxNews && nextNewsIDs[counter]) {
                    //     ajaxLoading = true;
                    //     axios
                    //         .get(`${process.env.REACT_APP_API_URL}content-details/${nextNewsIDs[counter]}`)
                    //         .then(({ data }) => {
                    //             if (data.data && data.data[0] && data.data[0].ContentID && !document.getElementById(data.data[0].ContentID)) {
                    //                 setState(oldArray => [...oldArray, data.data[0]]);
                    //                 ajaxLoading = false;
                    //                 setTimeout(function () {
                    //                     lazyloaded = false
                    //                     ForLazyLoaderImg(lazyloaded)
                    //                 }, 1000);
                    //                 setTimeout(function () {
                    //                     inner_Caption(data.data[0].ContentID)
                    //                     ineerRelatedNews(data.data[0].ContentID)
                    //                 }, 400);
                    //                 if (data.data[0].created_at) {
                    //                     dateArray.push(data.data[0].created_at)
                    //                 } else {
                    //                     dateArray.push([])
                    //                 }
                    //                 allTags = data.data[0].Tags
                    //                 // if (allTags) {
                    //                 //     tagArray.push(allTags.split(','))
                    //                 // } else {
                    //                 //     tagArray.push([])
                    //                 // }
                    //                 setWriter(oldArray => [...oldArray, data.data[0].content_contributors])
                    //                 axios
                    //                     .get(`${process.env.REACT_APP_API_URL}related-news/${nextNewsIDs[counter]}`)
                    //                     .then(({ data }) => {
                    //                         R_ContentData['id' + nextNewsIDs[counter]] = data.relatedNewslist;
                    //                     });
                    //             }
                    //             else {
                    //                 ajaxLoading = false;
                    //             }
                    //         });
                    // }

                    var Wscroll = window.pageYOffset
                    var elements = document.getElementsByClassName('newsDetail');

                    for (var i = 0; i < elements.length; i++) {
                        if (Wscroll > elements[i].offsetTop && Wscroll < elements[i].offsetTop + elements[i].offsetHeight) {
                            let id = elements[i].getAttribute('id')
                            let title = elements[i].getAttribute('data-title')

                            if ((window.location.href).split('/').pop() !== id) {
                                document.title = title;
                                document.querySelector('meta[name="description"]').setAttribute("content", title);
                                if (!localStorage.getItem('contentView_' + id)) {
                                    localStorage.setItem('contentView_' + id, 1);
                                    axios
                                        .get(`${process.env.REACT_APP_API_URL}hit-count/${id}`)
                                        .then(({ data }) => {
                                        })
                                }
                                window.history.replaceState(null, null, id);
                            }
                        }
                    }
                }
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true });

        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => {
        //     window.removeEventListener("scroll", handleScroll);
        //     clearTimeout(timer);
        // }
    }, [catSlug, id])
    if (!localStorage.getItem('contentView_' + id)) {
        localStorage.setItem('contentView_' + id, 1);
        axios
            .get(`${process.env.REACT_APP_API_URL}hit-count/${id}`)
            .then(({ data }) => {
            })
    }

    const inner_Caption = (id) => {
        // let contentImages = document.querySelectorAll(`#contentDetails.contentDetails${id} p img`)
        // for (let index = 0; index < contentImages.length; index++) {
        //     let caption = contentImages[index].getAttribute('alt');
        //     let pstyle = contentImages[index].getAttribute('style');
        //     contentImages[index].removeAttribute('style');
        //     let image = contentImages[index].outerHTML
        //     if (caption !== "") {
        //         let newDiv = `<div className="dCaption2" style="${pstyle}">${image}<p className="img-caption">${caption}</p></div>`
        //         contentImages[index].outerHTML = newDiv
        //     } else {
        //         let newDiv = `<div className="dCaption2" style="${pstyle}">${image}</div>`
        //         contentImages[index].outerHTML = newDiv
        //     }
        // }

        let contentIframes = document.querySelectorAll(`#contentDetails.ContentDetails${id} p iframe`)
        for (let index = 0; index < contentIframes.length; index++) {
            let iframeElement = contentIframes[index]
            if (iframeElement.hasAttribute('sandbox')) {
                iframeElement.removeAttribute('sandbox')
            }
            let iframe = iframeElement.outerHTML;
            let newDiv = `<div className="embed-responsive embed-responsive-16by9">${iframe}</div>`
            contentIframes[index].outerHTML = newDiv
            // console.log(iframe);
        } //internal video from iframe

        let contentScript = document.querySelectorAll(`#contentDetails.contentDetails${id} p script`)
        for (let index = 0; index < contentScript.length; index++) {
            let script = contentScript[index]
            var newscript = document.createElement('script');
            newscript.type = 'text/javascript';
            newscript.async = true;
            newscript.src = script.src;
            script.parentNode.insertBefore(newscript, script)
            script.remove()
        }
    }

    const ineerRelatedNews = (id) => {
        var contentDetails = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0]
        var contentDetailsChildDiv = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[1]
        var contentDetailsChildDiv2 = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[2]

        const relatedNewsDiv = document.createElement('div');
        relatedNewsDiv.className = 'DRelatedNewsSection d-print-none';
        const para = document.createElement("p");
        para.className = 'DRelatedNews Title';
        para.innerHTML = `<i className="fa-solid fa-list"></i> আরও পড়ুন:`
        relatedNewsDiv.appendChild(para);

        const relatedNewsMainDiv = document.createElement('div');
        relatedNewsMainDiv.className = 'row';

        let R_Arr = R_ContentData['id' + id]
        let R_HTML = ''
        for (let i = 0; i < R_Arr.length; i++) {
            if (contentDetailsChildDiv !== null) {
                R_HTML += `<div className="col-lg-3 col-12 d-flex ss">
                    <div className="DRelatedNewsList align-self-stretch">
                        <a href=${process.env.REACT_APP_FONT_DOMAIN_URL + "/" + R_Arr[i].Slug + R_Arr[i].ContentID}>
                            <div className="row">
                                <div className="col-lg-12 col-sm-4 col-5">
                                    <div className="DImgZoomBlocktest">
                                        <picture><img src=${process.env.REACT_APP_DOMAIN_URL + "media/imgAll/" + R_Arr[i].ImageSmPath} alt='${R_Arr[i].DetailsHeading}' title='${R_Arr[i].DetailsHeading}' fetchpriority="high" /></picture>
                                        ${R_Arr[i].ShowVideo === 1 || R_Arr[i].VideoID ? '<div className="card-video-icon"><i className="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div className="col-lg-12 col-sm-8 col-7">
                                    <div className="Desc">
                                        <h3 className="Title">${R_Arr[i].DetailsHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`;
                if (R_Arr.length >= i + 1) {
                    relatedNewsDiv.appendChild(relatedNewsMainDiv);
                    relatedNewsMainDiv.innerHTML = R_HTML
                    contentDetails.insertBefore(relatedNewsDiv, contentDetailsChildDiv2);
                }
            }
        }
    }
    function injectAdAfterParagraphs(htmlString, afterParagraph = 2) {
        if (!htmlString) return "";

        const paragraphs = htmlString.split(/<\/p>/i);

        if (paragraphs.length <= afterParagraph) {
            return htmlString; // Not enough paragraphs to inject
        }

        const adHTML = `
          <div class="AdsHideDetails mb-4 d-print-none">
            <a href="https://www.shwapno.com/" target='_blank'>
              <img src="${innerAds}"
                   alt="Advertisement" title="Advertisement" fetchpriority="high"  />
            </a>
          </div>
        `;

        const result = paragraphs.map((para, index) => {
            if (para.trim() === "") return "";
            const rebuilt = para + "</p>";
            if (index === afterParagraph - 1) {
                return rebuilt + adHTML;
            }
            return rebuilt;
        });

        return result.join("");
    }
    const toggleAccordion = (id) => {
        if (openIndex === id) {
            setOpenIndex(null); // close if same clicked
        } else {
            setOpenIndex(id);
        }
    };


    return (
        <>
            {/* {loading ?
                <div></div> : */}
            {catSlug ?
                <main>
                    <div className="container">
                        {state ? <Ldjson news={state} catName={catName} catSlug={catSlug} DisplayCatName={DisplayCatName} /> : ""}
                        <DocumentTitle title={heading} />
                        {LeadData === null ? (   // still loading
                            <div className="live-title-wrap mt-2">
                                <h3 className="liveTitle"></h3>
                            </div>
                        ) : LeadData && LeadData.length > 0 ? (   // has data
                            <div className="live-title-wrap mt-2">
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
                        ) : null}

                        <section>
                            <div className="row d-print-none">
                                <div className="col-lg-12 col-12 my-2">
                                    {catName && catName ? <div className="DSecTitle">
                                        <Link to={'/' + catSlug}>
                                            <h3><span className="ColorBox"></span>{catName}</h3>
                                        </Link>
                                    </div> : false}
                                    {/* <a href="https://www.shwapno.com" target='_blank'>
                                            <div className="AdsDetailsBlock">
                                                <img src={topAds} alt="Shwapno.com" title='Shwapno.com' className='img-fluid' />
                                            </div>
                                        </a> */}

                                </div>
                            </div>
                        </section>
                        <section id="newsSection">
                            {/* {state.map((news, index) => {
                                    const isLiveNews = news.ShowLiveBlog === 1 && news.LiveBlogStatus === 1;
                                    return (
                                        <div className="newsDetail" id={news.ContentID} data-title={news.DetailsHeading} key={news.ContentID}>
                                            {index === 0 ? <Ldjson news={news} catName={catName} catSlug={catSlug} /> : ""}
                                            <div className="row mt-2">
                                                <div className="col-lg-8 col-12">
                                                    <div className="ContentDetails">
                                                        {news.ContentSubHeading && <h3 className='DHeadingSubHeading'>{news.ContentSubHeading}</h3>}
                                                        <h1>{news.DetailsHeading}</h1>
                                                        {news.ContentShoulder && <h4 className='DHeadingContentShoulder'>{news.ContentShoulder}</h4>}
                                                    </div>
                                                    <div className=" mb-2  mt-4 d-contents d-sm-flex justify-content-between align-items-center d-print-none">
                                                        <div>
                                                            <DWriters news={news} />
                                                            <p className="pDate "><span>প্রকাশিত:</span> {formatDateToBengali24(news.created_at)}</p>
                                                        </div>
                                                        <div className='d-flex PRINTBTN mb-2'>
                                                            <p className="DTopImgCaption" style={{ paddingRight: '10px', paddingTop: '10px' }}></p>
                                                            <div className="DAdditionalInfo">
                                                                <button type="button" className="printMe" onClick={PrintAble}>
                                                                    <FaPrint />
                                                                </button>

                                                                <button id="btnDecrease" onClick={() => setFontSize(fontSize - 1)}>
                                                                    <span>A-</span>
                                                                </button>
                                                                <button id="btnOriginal" onClick={() => setFontSize(20)}>
                                                                    <span>A</span>
                                                                </button>
                                                                <button id="btnIncrease" onClick={() => setFontSize(fontSize + 1)}>
                                                                    <span>A+</span>
                                                                </button>
                                                            </div>
                                                            <DSocialShare title={news.AltSocialTitle ? news.AltSocialTitle : news.DetailsHeading} contentID={news.ContentID} />
                                                        </div>

                                                    </div>
                                                    {news.VideoID !== null && news.VideoID !== '' && news.ShowVideo === 1 ?
                                                        <>
                                                            <div className={news.Tags === null ? "col-sm-12 video-container mt-2" : "col-sm-12 video-container"}>
                                                                {news.VideoType === "youtube" ?
                                                                    <iframe className="embed-responsive-item" title="youtube-video" src={"https://www.youtube.com/embed/" + news.VideoID + "?autoplay=0"} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                                                    : news.VideoType === "vimeo" ?
                                                                        <iframe src={"https://player.vimeo.com/video/" + news.VideoID} title="vimeo-video" frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                                                                        : news.VideoType === "facebook" ?
                                                                            <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + news.VideoID + "%2F&show_text=0&width=560"} title="facebook-video" width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                                                            : news.VideoType === "instagram" ?
                                                                                <iframe className="embed-responsive-item" title="instagram-video" src={"//instagram.com/p/" + news.VideoID + ">/embed"} width="100%" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                                                                : false}
                                                            </div>
                                                        </> :
                                                        <>
                                                            <div className="DTopImg">
                                                                <div className="Details">
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + news.ImageBgPath} alt={news.DetailsHeading} title={news.DetailsHeading} className="img-fluid img100" />
                                                                </div>
                                                                {news.ImageBgPathCaption ?
                                                                    <div className="DetailsTopCap">
                                                                        <p className="DTopImgCaption">{news.ImageBgPathCaption}</p>
                                                                    </div> : " "}
                                                            </div>

                                                        </>
                                                    }
                                                   
                                                    {isLiveNews ? (
                                                        count.length > 0 && (
                                                            <div className="row mt-5">
                                                                <div className="col-lg-12">
                                                                    <div className="separator"></div>
                                                                    <div className="auto-update-wrapper">
                                                                        <span className="title">
                                                                            <div className="SquareIcon"></div>
                                                                            {toBengaliNumber(count.length)}টি আপডেট
                                                                        </span>
                                                                    </div>
                                                                    <ul className="liveupdateList">
                                                                        {count.map((nc) => (
                                                                            <li className="newsfeed" key={nc.ContentID}>
                                                                                <div className="liveUpdates">
                                                                                    <div className="card-live__icon">
                                                                                        <svg className="icon icon--live-orange icon--primary icon--20" viewBox="0 0 20 20" version="1.1" aria-hidden="true">
                                                                                            <title>live-orange</title>
                                                                                            <g>
                                                                                                <circle cx="10" cy="10" r="9" stroke="#db0303" strokeWidth="1.68" fill="#ffffff"></circle>
                                                                                                <circle cx="10" cy="10" r="5" fill="#db0303"></circle>
                                                                                            </g>
                                                                                        </svg>
                                                                                    </div>
                                                                                    <div className="card-live__last-updated">
                                                                                        <div className="date-relative">{timeAgo(nc.created_at)}</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-live__content-area">
                                                                                    <h2 className="Title">{nc.BlogTitle}</h2>
                                                                                    <div className={'ContentDetails page-break' + nc.ContentID} id={`contentDetails`}>
                                                                                        <div dangerouslySetInnerHTML={{ __html: nc.BlogBody }} id={`contentDetails ContentDetails${nc.ContentID}`} key={nc.ContentID}></div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )
                                                    ) : (

                                                        <>
                                                            <div className={'ContentDetails page-break  ContentDetails' + news.ContentId} id={"contentDetails"} style={{ fontSize: `${fontSize}px` }}>
                                                                {!news.ContentDetails ?
                                                                    <></> :
                                                                    <p dangerouslySetInnerHTML={{ __html: injectAdAfterParagraphs(news.ContentDetails, 2) }}></p>
                                                                }

                                                            </div>
                                                            {news.relatedNewslist && news.relatedNewslist.length > 0 ?
                                                                <div className="InnerReadMore d-print-none">

                                                                    <p className="Title"><i className="fas fa-list"></i> সংশ্লিষ্ট খবর:</p>
                                                                    {(news.relatedNewslist).map((nc) => {
                                                                        return (

                                                                            <ul className="InnerReadMoreList">
                                                                                <li key={nc.ContentID}>
                                                                                    <a href={"/" + nc.Slug + "/" + nc.ContentID}><span><div className="SquareIcon"></div>{nc.DetailsHeading}</span></a>
                                                                                </li>
                                                                            </ul>
                                                                        )
                                                                    })}

                                                                </div>
                                                                : ""}
                                                            {news.Tags ?
                                                                <div className="RelatedTags d-print-none">
                                                                    <div className="row">
                                                                        <div className="col-sm-12">
                                                                            <p className="Subject"> <FaTag />  সম্পর্কিত বিষয়: </p>
                                                                            {(news.Tags).split(',').map((nc) => {

                                                                                return (
                                                                                    <div className="TagList" key={nc}>
                                                                                        <Link to={"/tags/" + nc} onClick={scrollTop}><p>{nc}</p></Link>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div> : " "
                                                            }
                                                            <DfbComment contentID={news.ContentID} />
                                                        </>

                                                    )}
                                                </div>
                                                <div className="col-lg-4 col-12 d-none d-lg-block detailsPage">
                                                    <DCatLatest catLatest={catLatest} catName={catName} />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 d-print-none">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="astrodivider">
                                                            <div className="astrodividermask"></div>
                                                            <span><img src={favicon} alt="" className='img-fluid' /></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })} */}
                            {/* {state.map((news, index) => { */}
                            {/* const isLiveNews = state.ShowLiveBlog === 1 && state.LiveBlogStatus === 1; */}
                            {/* return ( */}
                            <div className="newsDetail" id={state.ContentID} data-title={state.DetailsHeading} key={state.ContentID}>
                                <div className="row mt-2">
                                    <div className="col-lg-8 col-12">
                                        <div className="ContentDetails">
                                            {state.ContentSubHeading && <h3 className='DHeadingSubHeading'>{state.ContentSubHeading}</h3>}
                                            <h1>{state.DetailsHeading}</h1>
                                            {state.ContentShoulder && <h4 className='DHeadingContentShoulder'>{state.ContentShoulder}</h4>}
                                        </div>
                                        <div className=" mb-2  mt-4 d-contents d-sm-flex justify-content-between align-items-center d-print-none">
                                            <div>
                                                <DWriters news={state} />
                                                <p className="pDate">
                                                    {state.created_at && (
                                                        <>
                                                            <span>প্রকাশিত: </span>
                                                            {formatDateToBengali24(state.created_at)}
                                                        </>
                                                    )}
                                                </p>


                                            </div>
                                            <div className='d-flex PRINTBTN mb-2'>
                                                <p className="DTopImgCaption" style={{ paddingRight: '10px', paddingTop: '10px' }}></p>
                                                <div className="DAdditionalInfo">
                                                    <button type="button" className="printMe" onClick={PrintAble}>
                                                        <FaPrint />
                                                    </button>

                                                    <button id="btnDecrease" onClick={() => setFontSize(fontSize - 1)}>
                                                        <span>A-</span>
                                                    </button>
                                                    <button id="btnOriginal" onClick={() => setFontSize(20)}>
                                                        <span>A</span>
                                                    </button>
                                                    <button id="btnIncrease" onClick={() => setFontSize(fontSize + 1)}>
                                                        <span>A+</span>
                                                    </button>
                                                </div>
                                                <DSocialShare title={state.AltSocialTitle ? state.AltSocialTitle : state.DetailsHeading} contentID={state.ContentID} />
                                            </div>

                                        </div>
                                        {state.VideoID !== null && state.VideoID !== '' && state.ShowVideo === 1 ?
                                            <>
                                                <div className={state.Tags === null ? "col-sm-12 video-container mt-2" : "col-sm-12 video-container"}>
                                                    {state.VideoType === "youtube" ?
                                                        <iframe className="embed-responsive-item" title="youtube-video" src={"https://www.youtube.com/embed/" + state.VideoID + "?autoplay=0"} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                                        : state.VideoType === "vimeo" ?
                                                            <iframe src={"https://player.vimeo.com/video/" + state.VideoID} title="vimeo-video" frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                                                            : state.VideoType === "facebook" ?
                                                                <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + state.VideoID + "%2F&show_text=0&width=560"} title="facebook-video" width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                                                : state.VideoType === "instagram" ?
                                                                    <iframe className="embed-responsive-item" title="instagram-video" src={"//instagram.com/p/" + state.VideoID + ">/embed"} width="100%" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                                                    : false}
                                                </div>
                                            </> :
                                            <>
                                                <div className="DTopImg">
                                                    <div className="Details">
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + state.ImageBgPath} alt={state.DetailsHeading} title={state.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{ width: "800px", height: "100%" }} />
                                                    </div>
                                                    {state.ImageBgPathCaption ?
                                                        <div className="DetailsTopCap">
                                                            <p className="DTopImgCaption">{state.ImageBgPathCaption}</p>
                                                        </div> : " "}
                                                </div>

                                            </>
                                        }

                                        {state.ShowLiveBlog === 1 && state.LiveBlogStatus === 1 ? (
                                            count.length > 0 && (
                                                <div className="row mt-5">
                                                    <div className="col-lg-12">
                                                        <div className="separator"></div>
                                                        <div className="auto-update-wrapper">
                                                            <span className="title">
                                                                <div className="SquareIcon"></div>
                                                                {toBengaliNumber(count.length)}টি আপডেট
                                                            </span>
                                                        </div>
                                                        <ul className="liveupdateList">
                                                            {count.map((nc) => (
                                                                <li className="newsfeed" key={nc.ContentID}>
                                                                    <div className="liveUpdates">
                                                                        <div className="card-live__icon">
                                                                            <svg className="icon icon--live-orange icon--primary icon--20" viewBox="0 0 20 20" version="1.1" aria-hidden="true">
                                                                                <title>live-orange</title>
                                                                                <g>
                                                                                    <circle cx="10" cy="10" r="9" stroke="#db0303" strokeWidth="1.68" fill="#ffffff"></circle>
                                                                                    <circle cx="10" cy="10" r="5" fill="#db0303"></circle>
                                                                                </g>
                                                                            </svg>
                                                                        </div>
                                                                        <div className="card-live__last-updated">
                                                                            <div className="date-relative">{timeAgo(nc.created_at)}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-live__content-area">
                                                                        <h2 className="Title">{nc.BlogTitle}</h2>
                                                                        <div className={'ContentDetails page-break' + nc.ContentID} id={`contentDetails`}>
                                                                            <div dangerouslySetInnerHTML={{ __html: nc.BlogBody }} id={`contentDetails ContentDetails${nc.ContentID}`} key={nc.ContentID}></div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )
                                        ) : (

                                            <>
                                                <div className={'ContentDetails page-break  ContentDetails' + state.ContentId} id={"contentDetails"} style={{ fontSize: `${fontSize}px` }}>
                                                    {!state.ContentDetails ?
                                                        <></> :
                                                        <p dangerouslySetInnerHTML={{ __html: injectAdAfterParagraphs(state.ContentDetails, 2) }}></p>
                                                    }

                                                </div>
                                                {state.relatedNewslist && state.relatedNewslist.length > 0 ?
                                                    <div className="InnerReadMore d-print-none">

                                                        <p className="Title"><i className="fas fa-list"></i> সংশ্লিষ্ট খবর:</p>
                                                        {(state.relatedNewslist).map((nc) => {
                                                            return (

                                                                <ul className="InnerReadMoreList">
                                                                    <li key={nc.ContentID}>
                                                                        <a href={"/" + nc.Slug + "/" + nc.ContentID}><span><div className="SquareIcon"></div>{nc.DetailsHeading}</span></a>
                                                                    </li>
                                                                </ul>
                                                            )
                                                        })}

                                                    </div>
                                                    : ""}
                                                {state.Tags ?
                                                    <div className="RelatedTags d-print-none">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <p className="Subject"> <FaTag />  সম্পর্কিত বিষয়: </p>
                                                                {(state.Tags).split(',').map((nc) => {

                                                                    return (
                                                                        <div className="TagList" key={nc}>
                                                                            <Link to={"/tags/" + nc} onClick={scrollTop}><p>{nc}</p></Link>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div> : " "
                                                }
                                                {state.faq ?
                                                    <>
                                                        <div className="faq-area-section">
                                                            <div className="RelatedTags d-print-none">
                                                                <div className="row">
                                                                    <div className="col-sm-12">
                                                                        <div className="faq-area">
                                                                            <div className="accordion" id="accordionExample">
                                                                                {state.faq.map((item) => {
                                                                                    return (
                                                                                        <>
                                                                                            <p className="Subject"> <FaTag /> FAQ : </p>
                                                                                            <div className="accordion-item mt-3" key={item.id}>
                                                                                                <h2 className="accordion-header">
                                                                                                    <button
                                                                                                        className={`accordion-button ${openIndex === item.id ? "" : "collapsed"
                                                                                                            }`}
                                                                                                        type="button"
                                                                                                        onClick={() => toggleAccordion(item.id)}
                                                                                                    >
                                                                                                        {item.Question}
                                                                                                    </button>
                                                                                                </h2>
                                                                                                <div
                                                                                                    className={`accordion-collapse collapse ${openIndex === item.id ? "show" : ""
                                                                                                        }`}
                                                                                                >
                                                                                                    <div className="accordion-body">{item.Answer}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </>

                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }
                                                <DfbComment contentID={state.ContentID} />
                                            </>

                                        )}
                                    </div>
                                    <div className="col-lg-4 col-12 d-none d-lg-block detailsPage">
                                        <DCatLatest catLatest={catLatest} catName={catName} />
                                        <div className="Ads-area sticky-ads">
                                            <a href="https://www.shwapno.com/" target='_blank' rel="noreferrer">
                                                <div className="DRightSideAddFeature">
                                                    <img src={Ads} alt="Shwapno.com" title="Shwapno.com" fetchpriority="high" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 d-print-none">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="astrodivider">
                                                <div className="astrodividermask"></div>
                                                <span><img src={favicon} alt="" className='img-fluid' fetchpriority="high" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* );
                                })} */}
                        </section>
                        <section>
                            <div className="row mt-3 d-print-none">
                                <div className="col-lg-9 col-12">
                                    <div className="DRelatedNews">
                                        <DCatPopular catPopular={catPopular} catName={catName} />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-12">
                                    <div className="mt-4 d-block d-lg-none">
                                        <DCatLatest catLatest={catLatest} catName={catName} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </main>
                : <ErrorPage />}
        </>
    )
}

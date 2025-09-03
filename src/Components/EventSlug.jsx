import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
// import { EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "react-share";
import DocumentTitle from 'react-document-title';
import { ForLazyLoaderImg, scrollTop } from './AllFunctions';
import ErrorPage from './ErrorPage';

const limit = 12;
var loadContent
export default function EventSlug() {
    const [pageURL, setPageURL] = useState('');
    // const [tags, setTags] = useState([]);
    const [tagsRelatedNews, setTagsRelatedNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [showMore, setShowMore] = useState(true);
    const [eventName, setEventName] = useState([])
    const { EventSlug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        const currentURL = window.location.href;
        setPageURL(currentURL);
        setOffset(0);
        setIsLoading(true);
        axios
            .get(`${process.env.REACT_APP_API_URL}latest-event`)
            .then(({ data }) => {
                if (data.event !== null) {
                    const event = data.event[0];
                    setEventName(event)
                }
            })
        //     const formdata = { slug: EventSlug, limit: limit, offset: offsetValue };
        // axios
        //     .post(`${process.env.REACT_APP_API_URL}event-content`,formdata)
        //     .then(({ data }) => {
        //         console.log(data.data + "hello");
        //         if (data.data) {
        //             setTags(data.data);
        //             setIsLoading(false);
        //         } else {
        //             setTags(null);
        //         }

        //     });
        loadContent(0);

        // document.querySelector('link[rel="canonical"]')?.setAttribute('href', currentURL);
        // const timer = setTimeout(() => { window.location.reload(); }, 300000);
        // return () => clearTimeout(timer);
    }, [EventSlug]);

    loadContent = (offsetValue) => {
        const formdata = { slug: EventSlug, limit: limit, offset: offsetValue };
        setIsLoading(true);

        axios.post(`${process.env.REACT_APP_API_URL}event-content`, formdata)
            .then(({ data }) => {
                if (offsetValue === 0) {
                    setTagsRelatedNews(data.data);
                }
                else {
                    const newContents = data.data.filter(nc =>
                        !tagsRelatedNews.some(existing => existing.ContentID === nc.ContentID)
                    );
                    setTagsRelatedNews(prev => [...prev, ...newContents]);
                }

                if (data.data.length < limit) {
                    setShowMore(false);
                } else {
                    setShowMore(true);
                }
                setTimeout(() => ForLazyLoaderImg(false), 500);
                setIsLoading(false);
            })
    };
    const toggleButtonState = (e) => {
        e.preventDefault();
        const newOffset = offset + limit;
        setOffset(newOffset);
        loadContent(newOffset);
    };

    return (
        <>
            {EventSlug ? (
                <main className='event-section'>
                    <div className="container">
                        <div className="TopHomeSection"></div>
                        <div className="DTagLead">
                            <DocumentTitle title={EventSlug} />
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="DSpeEventTitle2">
                                        <h1>
                                            {eventName.EventTitle}
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row">
                                {tags.map(nc => (
                                    <React.Fragment key={nc.TagID}>
                                        {nc.ImageSmPath ? (
                                            <>
                                                <div className="col-lg-2 col-sm-4 col-5">
                                                    <img
                                                        src={process.env.REACT_APP_LAZYL_IMG}
                                                        data-src={process.env.REACT_APP_IMG_Tag + nc.ImageSmPath}
                                                        alt={nc.TagTitle}
                                                        title={nc.TagTitle}
                                                        className="img-fluid img100 lazy"
                                                    />
                                                </div>
                                                <div className="col-lg-10 col-sm-8 col-7">
                                                    <div className="Desc">
                                                        <h2 className="Title">{nc.TagTitle}</h2>
                                                        <p dangerouslySetInnerHTML={{ __html: nc.TagDesc }}></p>
                                                        <div className="DSocialTop">
                                                            <FacebookShareButton url={pageURL} title={nc.TagTitle}><FacebookIcon size={30} round /></FacebookShareButton>
                                                            <LinkedinShareButton url={pageURL}><LinkedinIcon size={30} round /></LinkedinShareButton>
                                                            <TwitterShareButton url={pageURL}><TwitterIcon size={30} round /></TwitterShareButton>
                                                            <EmailShareButton url={pageURL}><EmailIcon size={30} round /></EmailShareButton>
                                                            <WhatsappShareButton url={pageURL}><WhatsappIcon size={30} round /></WhatsappShareButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="col-12">
                                                <div className="Desc">
                                                    <h2 className="Title">{nc.TagTitle}</h2>
                                                    <div className="DSocialTop">
                                                        <FacebookShareButton url={pageURL} title={nc.TagTitle}><FacebookIcon size={30} round /></FacebookShareButton>
                                                        <LinkedinShareButton url={pageURL}><LinkedinIcon size={30} round /></LinkedinShareButton>
                                                        <TwitterShareButton url={pageURL}><TwitterIcon size={30} round /></TwitterShareButton>
                                                        <EmailShareButton url={pageURL}><EmailIcon size={30} round /></EmailShareButton>
                                                        <WhatsappShareButton url={pageURL}><WhatsappIcon size={30} round /></WhatsappShareButton>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div> */}
                        </div>
                        <div className="event-segment">
                            <div className="row">
                                {tagsRelatedNews.map((nc, i) => (
                                    <div className="col-lg-6 col-sm-12" key={i}>
                                        <div className="archiveListNews">
                                            <Link rel="preload" as="image" to={`/details/${nc.categorySlug}/${nc.ContentID}`} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-sm-4 col-5 card-video-part">
                                                        <div className="DImgZoomBlock">
                                                            <picture>
                                                                <img
                                                                    src={process.env.REACT_APP_LAZYL_IMG}
                                                                    data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath}
                                                                    alt={nc.DetailsHeading}
                                                                    title={nc.DetailsHeading}
                                                                    fetchpriority="high"
                                                                    className="lazy"
                                                                />
                                                            </picture>
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8 col-7">
                                                        <div className="Desc">
                                                            <h3 className="Title BGTitle">{nc.DetailsHeading}</h3>
                                                            <div className="Brief">
                                                                <p dangerouslySetInnerHTML={{ __html: nc.ContentBrief }}></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                                {showMore && (
                                    <div id="btnDiv" className="text-center my-4">
                                        <button className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>
                                            আরও... {isLoading && (
                                                <img
                                                    src={process.env.REACT_APP_FONT_DOMAIN_URL + "media/common/loading.gif"}
                                                    alt="loading"
                                                    title="loading"
                                                    fetchpriority="high"
                                                    style={{ width: '28px', marginLeft: '12px' }}
                                                />
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </main>
            ) : (
                <ErrorPage />
            )}
        </>
    );
}

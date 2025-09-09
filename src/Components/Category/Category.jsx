import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import DocumentTitle from "react-document-title";
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';
import DivisionDistricName from '../Country/DivisionDistricName';
import ErrorPage from '../ErrorPage';
import CatLdJson from './CatLdJson';
import SubcatNames from './SubcatNames';
// import Ads from '../../assets/media/Advertisement/Shwapno-Parallax-Advert-300.jpg';

// var lazyloaded = false;
var limit = 8;
var LeadNewsLimit = 5;

export default function Category() {
    const { catSlug } = useParams();
    const [catName, setcatName] = useState(null);
    const [catNewsMore, setcatLeadMore] = useState([]);
    const [catLeadNews1, setcatLeadNews1] = useState(null);
    const [catLeadNews2, setcatLeadNews2] = useState(null);
    const [catLeadNews3, setcatLeadNews3] = useState([]);
    const [news, setNews] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const offsetRef = useRef(5);
    const catIDRef = useRef(0);

    useEffect(() => {
        setcatName(null);
        setIsDataFetched(false);

        axios.get(`${process.env.REACT_APP_API_URL}category/${catSlug}`)
            .then(({ data }) => {
                if (data.category) {
                    setcatName(data.category);
                    catIDRef.current = data.category.CategoryID;

                    axios.get(`${process.env.REACT_APP_API_URL}inner-category-content/${catIDRef.current}/${LeadNewsLimit}`)
                        .then(({ data }) => {
                            if (data.inner_category_content) {
                                setcatLeadNews1(data.inner_category_content[0]);
                                setcatLeadNews2(data.inner_category_content[1]);
                                setcatLeadNews3(data.inner_category_content.slice(2, 5));
                                setNews(data.inner_category_content);

                                const top_content_ids = data.inner_category_content.map(el => el.ContentID);
                                const formData = {
                                    category_id: catIDRef.current,
                                    limit,
                                    offset: 0,
                                    top_content_ids
                                };

                                axios.post(`${process.env.REACT_APP_API_URL}inner-category-content-more`, formData)
                                    .then(({ data }) => {
                                        if (data.data) {
                                            setcatLeadMore(data.data);
                                            setShowMore(data.data.length >= limit);
                                            setTimeout(() => ForLazyLoaderImg(false), 1000);
                                        }
                                        setIsDataFetched(true);
                                    });
                            } else {
                                setIsDataFetched(true);
                            }
                        });
                } else {
                    setIsDataFetched(true);
                }
            });

        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, [catSlug]);

    const toggleButtonState = (e) => {
        e.preventDefault();
        offsetRef.current += limit;
        const top_content_ids = news.map(el => el.ContentID);
        const formData = {
            category_id: catIDRef.current,
            limit,
            offset: offsetRef.current,
            top_content_ids
        };

        axios.post(`${process.env.REACT_APP_API_URL}inner-category-content-more`, formData)
            .then(({ data }) => {
                if (data.data && data.data.length > 0) {
                    setcatLeadMore(oldArray => [...oldArray, ...data.data]);
                    setShowMore(data.data.length >= limit);
                    setTimeout(() => ForLazyLoaderImg(false), 1000);
                } else {
                    setShowMore(false);
                }
            });
    };

    if (!isDataFetched) {
        return null;
    }

    return catName ? (
        <main>
            <div className="container">
                {/* <DocumentTitle title={`${catName.CategoryName} | ${catName.CategoryName} সর্বশেষ খবর :: দেশকালনিউজ`} /> */}
                <DocumentTitle
                    title={`${catName && catName.DisplayCatName
                            ? catName.DisplayCatName
                            : catName?.CategoryName + " সর্বশেষ খবর :: দেশকালনিউজ"}`
                        }
                />
                <CatLdJson CatNames={catName.CategoryName} CatNameSlug={catName.Slug} />

                <div className="DTitle">
                        <div className="DTitleInner"><h1 className="DTitleInnerBar"><span>{catName?.CategoryName || <Skeleton width={120} />}</span></h1></div>
                </div>

                {catSlug === 'country' ? <DivisionDistricName /> : <SubcatNames />}

                <div className='category-area'>
                    <div className="row">
                        <div className="col-lg-9 col-sm-12 ">
                            <div className="DcatTopArea">
                                <div className="row">
                                    <div className="col-lg-8 col-12 d-flex ">
                                        <div className="DCatLeadTop">
                                            {catLeadNews1 && (
                                                <Link rel="preload" as="image" to={`"/" + ${catLeadNews1.Slug}/${catLeadNews1.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-8 col-12">
                                                            <div className="DImgZoomBlock">
                                                                <picture>
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews1.ImageBgPath} alt={catLeadNews1.DetailsHeading} title={catLeadNews1.DetailsHeading} fetchpriority="high" style={{width: "100%", height:"auto"}} />
                                                                </picture>
                                                                {catLeadNews1.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-12">
                                                            <div className="Desc">
                                                                <h3 className="Title BGTitle">{catLeadNews1.DetailsHeading}</h3>
                                                                <div className="Brief">
                                                                    <p>{catLeadNews1.ContentBrief}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12 d-flex">
                                        <div className="DCatTop2 align-self-stretch">
                                            {catLeadNews2 && (
                                                <Link to={`/${catLeadNews2.Slug}/${catLeadNews2.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture>
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews2.ImageSmPath} alt={catLeadNews2.DetailsHeading} title={catLeadNews2.DetailsHeading} fetchpriority="high" style={{width: "300px", height:"100%"}} />
                                                                </picture>
                                                                {catLeadNews2.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-sm-8 col-7">
                                                            <div className="Desc">
                                                                <h3 className="Title">{catLeadNews2.DetailsHeading}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="DCatTop3">
                                <div className="row">
                                    {catLeadNews3.map((nc) => (
                                        <div className="col-lg-4 col-12 d-flex border-right-inner" key={nc.ContentID}>
                                            <div className="DCatTop3tList align-self-stretch">
                                                <Link to={`/${nc.Slug}/${nc.ContentID}`} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture>
                                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" style={{width: "300px", height:"100%"}} />
                                                                </picture>
                                                                {nc.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-sm-8 col-7">
                                                            <div className="Desc">
                                                                <h3 className="Title">{nc.DetailsHeading}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 col-sm-12 mt-4 BorderRight">
                                    <h2 className="LatestNewsH ">{catName.CategoryName} বিভাগের সব খবর</h2>
                                    <div className="DCatNewsListArea">
                                        <div className="row">
                                            {catNewsMore.map((nc) => (
                                                <div className="col-lg-6 col-12 d-flex" key={nc.ContentID}>
                                                    <div className="DCatNewsList align-self-stretch">
                                                        <Link to={`/${nc.Slug}/${nc.ContentID}`} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-5 col-sm-4 col-5">
                                                                    <div className="DImgZoomBlock">
                                                                        <picture>
                                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={nc.ImageSmPath ? process.env.REACT_APP_IMG_Path + nc.ImageSmPath : process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading}  fetchpriority="high" style={{width: "100%", height:"auto"}}  />
                                                                        </picture>
                                                                        {nc.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-7 col-sm-8 col-7">
                                                                    <h3 className="Title">
                                                                        {nc.ContentSubHeading ? <><span className="subHeading">{nc.ContentSubHeading} / </span>{nc.DetailsHeading}</> : nc.DetailsHeading}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {showMore && (
                                        <div id="btnDiv" className="text-center mt-4 mb-4">
                                            <button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>আরও...</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* {catSlug === "feature" && (
                            <div className="col-lg-3 col-sm-12">
                                <div className="Ads-area sticky-ads">
                                    <a href="https://www.shwapno.com/" target='_blank' rel="noreferrer">
                                        <div className="DRightSideAddFeature">
                                            <img src={Ads} alt="Shwapno.com" title="Shwapno.com" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </main>
    ) : (
        <ErrorPage />
    );
}

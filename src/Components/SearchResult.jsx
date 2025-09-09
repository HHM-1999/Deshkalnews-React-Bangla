import React, { useEffect, useState } from "react";
import DocumentTitle from "react-document-title";
import { Link, useParams, useNavigate } from "react-router-dom";
import { scrollTop, ForLazyLoaderImg, formatDateToBengali } from "./AllFunctions";
import axios from "axios";

const limit = 12;

export default function SearchResult() {
    let navigate = useNavigate();
    // let { searchSlug } = useParams();
    // const searchValue = searchSlug;
    let searchSlug = useParams();
    var searchValue = searchSlug.searchSlug
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [offset, setOffset] = useState(0);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        if (searchValue) {
            window.scroll(0, 0);
            fetchNews(true);
        }
    }, [searchValue]);

    const fetchNews = (reset = false) => {
        if (reset) {
            setIsLoading(true);
            setOffset(0);
            setNews([]);
        } else {
            setIsLoadingData(true);
        }

        const formData = {
            keywords: searchValue,
            start_date: "",
            end_date: "",
            category_id: "",
            limit,
            offset: reset ? 0 : offset,
        };

        axios
            .post(`${process.env.REACT_APP_API_URL}archive`, formData)
            .then(({ data }) => {
                if (reset) setIsLoading(false);
                else setIsLoadingData(false);

                if (data.data.length > 0) {
                    setNews((prevNews) => (reset ? data.data : [...prevNews, ...data.data]));
                    setOffset((prevOffset) => prevOffset + data.data.length);
                } else {
                    if (reset) {
                        setNews(null);
                    }
                    setShowMore(false);
                }

                setTimeout(() => {
                    ForLazyLoaderImg(false);
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
                setIsLoadingData(false);
            });
    };

    const handleLoadMore = (e) => {
        e.preventDefault();
        fetchNews(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const txt = e.target.q.value.trim();
        if (txt) navigate(`/search/${txt}`);
    };

    return (
        <>
            <main>
                <div className="container">
                    <div className="TopHomeSection"></div>
                    <DocumentTitle title="খুঁজুন" />
                    <h1 className="mvp-feat1-pop-head">
                        <a href={`/search/${searchValue}`} onClick={scrollTop}>
                            <span className="mvp-feat1-pop-head">খুঁজুন</span>
                        </a>
                    </h1>

                    <div className="row searchResult">
                        <div className="col-sm-12 d-flex justify-content-center my-5">
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-auto">
                                    <input type="text" name="q" placeholder="এখানে লিখুন..." className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary mb-3">
                                        খুঁজুন
                                        {isLoading && (
                                            <img src="/media/common/loading.gif" alt="loading" fetchpriority="high" style={{ width: "28px", marginLeft: "12px" }} />
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {!isLoading && news === null && (
                        <h1 className="warningHeader">
                            <span>দুঃখিত,</span> কোন খবর খুঁজে পাওয়া যায়নি।
                        </h1>
                    )}

                    {!isLoading && news && news.length > 0 && (
                        <>
                            <div className="row archiveSection">
                                {news.map((nc) => (
                                    <div className="col-lg-6 col-sm-12" key={nc.ContentID}>
                                        <div className="archiveListNews">
                                            <Link rel="preload" as="image" to={`"/"+${nc.Slug}/${nc.ContentID}`} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-sm-4 col-5 card-video-part">
                                                        <div className="DImgZoomBlock">
                                                            <picture>
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} fetchpriority="high" style={{ width: "100%", height: "auto" }} />
                                                            </picture>
                                                            {nc.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8 col-7">
                                                        <div className="Desc">
                                                            <h3 className="catTitle">{nc.CategoryName}</h3>
                                                            <h3 className="Title BGTitle">
                                                                {nc.ContentSubHeading ? <span className="subHeading">{nc.ContentSubHeading} / </span> : ""}
                                                                {nc.DetailsHeading}
                                                            </h3>
                                                            <div className="Brief">
                                                                <p>{nc.ContentBrief}</p>
                                                            </div>
                                                        </div>
                                                        <p className="pDate">{formatDateToBengali(nc.created_at)}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {showMore && (
                                <div id="btnDiv" className="text-center mt-3 mb-4">
                                    <button onClick={handleLoadMore} id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG">
                                        আরো খবর...
                                        {isLoadingData && (
                                            <img src="/media/common/loading.gif" alt="loading" fetchpriority="high" style={{ width: "28px", marginLeft: "12px" }} />
                                        )}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
}

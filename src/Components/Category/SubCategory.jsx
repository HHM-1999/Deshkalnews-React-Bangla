import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import DocumentTitle from "react-document-title";
import { Link, useParams } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';
import ErrorPage from '../ErrorPage';
import SubCatLdJson from './SubCatLdJson';

export default function SubCategory() {
    let { catSlug, subCatSlug } = useParams();

    const [CatName, setCatName] = useState(null);
    const [CatSlug, setCatSlug] = useState(null);
    const [subCatName, setSubCatName] = useState(null);
    const [catLeadNews1, setcatLeadNews1] = useState(null);
    const [catLeadNews2, setcatLeadNews2] = useState(null);
    const [catLeadNews3, setcatLeadNews3] = useState([]);
    const [catNewsMore, setcatLeadMore] = useState([]);
    const [news, setNews] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const offsetRef = useRef(0);
    const limit = 8;
    const LeadNewsLimit = 5;
    const SubcatIDRef = useRef(0);

    useEffect(() => {
        offsetRef.current = 0;
        setIsDataFetched(false);

        axios.get(`${process.env.REACT_APP_API_URL}sub-categorys/${catSlug}/${encodeURIComponent(subCatSlug)}`)
            .then(({ data }) => {
                if (data.subCategories.Slug === subCatSlug) {
                    const subcat = data.subCategories;
                    SubcatIDRef.current = subcat.CategoryID;

                    setCatSlug(subcat.Slug);
                    setCatName(subcat.CategoryName);
                    setSubCatName(subcat);

                    axios.get(`${process.env.REACT_APP_API_URL}inner-sub-category-content/${SubcatIDRef.current}/${LeadNewsLimit}`)
                        .then(({ data }) => {
                            if (data.inner_subcategory_content) {
                                const leadNews = data.inner_subcategory_content;

                                setcatLeadNews1(leadNews[0] || null);
                                setcatLeadNews2(leadNews[1] || null);
                                setcatLeadNews3(leadNews.slice(2, 5));
                                setNews(leadNews);

                                const top_content_ids = leadNews.map(el => el.ContentID);
                                const formData = {
                                    category_id: SubcatIDRef.current,
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
                                    })
                                    .catch(() => setIsDataFetched(true));
                            } else {
                                setIsDataFetched(true);
                            }
                        })
                        .catch(() => setIsDataFetched(true));
                } else {
                    setCatName(null);
                    setIsDataFetched(true);
                }
            })
            .catch(() => setIsDataFetched(true));
    }, [catSlug, subCatSlug]);

    const toggleButtonState = (e) => {
        e.preventDefault();
        offsetRef.current += limit;

        const top_content_ids = news.map(n => n.ContentID);
        const formData = {
            category_id: SubcatIDRef.current,
            limit,
            offset: offsetRef.current,
            top_content_ids
        };

        axios.post(`${process.env.REACT_APP_API_URL}inner-category-content-more`, formData)
            .then(({ data }) => {
                if (data.data && data.data.length > 0) {
                    const updatedNews = [...news, ...data.data];
                    setNews(updatedNews);
                    setcatLeadMore(updatedNews.slice(5));
                    setShowMore(data.data.length >= limit);
                    setTimeout(() => ForLazyLoaderImg(false), 1000);
                } else {
                    setShowMore(false);
                }
            });
    };

    if (!isDataFetched) {
        // You can return a loader here instead of null
        return <div className="text-center my-5">Loading...</div>;
    }
    return (
        <>
            {CatName && subCatName  ? (
                <main>
                    <div className="container">
                        <h1 className="DTitle">
                                <span className="DTitleInner">
                                    <span className="DTitleInnerBar">
                                        <span>{subCatName.CategoryName}</span>
                                    </span>
                                </span>
                            <DocumentTitle title={`${subCatName.CategoryName} | ${subCatName.CategoryName} সর্বশেষ খবর :: দেশকালনিউজ`} />
                            <SubCatLdJson CatNames={CatName} CatNameSlug={CatSlug} SubCatNames={subCatName.CategoryName} SubCatNameSlug={subCatName.Slug} />
                        </h1>

                        <section>
                            <div className="row">
                                <div className="col-lg-9 col-sm-12 mt-3">
                                    <div className="row">
                                        <div className="col-lg-8 col-12 d-flex">
                                            <div className="DCatLeadTop ">
                                                {catLeadNews1 && (
                                                    <Link  rel="preload" as="image" to={`/${catSlug}/${catLeadNews1.ContentID}`} onClick={scrollTop}>
                                                        <div className="row">
                                                            <div className="col-lg-8 col-12">
                                                                <div className="DImgZoomBlock">
                                                                    <picture>
                                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews1.ImageBgPath} alt={catLeadNews1.DetailsHeading} title={catLeadNews1.DetailsHeading} fetchpriority="high" style={{width: "100%", height:"auto"}} />
                                                                    </picture>
                                                                    {catLeadNews1.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
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
                                                    <Link to={`/details/${catSlug}/${catLeadNews2.ContentID}`} onClick={scrollTop}>
                                                        <div className="row">
                                                            <div className="col-lg-12 col-sm-4 col-5">
                                                                <div className="DImgZoomBlock">
                                                                    <picture>
                                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews2.ImageSmPath} alt={catLeadNews2.DetailsHeading} title={catLeadNews2.DetailsHeading}  fetchpriority="high" style={{width: "300px", height:"100%"}} />
                                                                    </picture>
                                                                    {catLeadNews2.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-sm-8 col-7">
                                                                <div className="Desc">
                                                                    {catLeadNews2.ContentSubHeading == null ? (
                                                                        <h3 className="Title">{catLeadNews2.DetailsHeading}</h3>
                                                                    ) : (
                                                                        <h3 className="Title"><span className="subHeading">{catLeadNews2.ContentSubHeading} /</span>{catLeadNews2.DetailsHeading}</h3>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="DCatTop3">
                                        <div className="row">
                                            {catLeadNews3.map((nc) => (
                                                <div className="col-lg-4 col-12 d-flex border-right-inner" key={nc.ContentID}>
                                                    <div className="DCatTop3tList align-self-stretch">
                                                        <Link to={`/details/${catSlug}/${nc.ContentID}`} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-sm-4 col-5">
                                                                    <div className="DImgZoomBlock">
                                                                        <picture>
                                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" style={{width: "100%", height:"auto"}} />
                                                                        </picture>
                                                                        {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
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
                                </div>
                            </div>
                        </section>

                        <div className="DBannerAdd text-center mt-2 mb-2">
                            <Link to="/">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="Advertisement" title="Advertisement" fetchpriority="high" className="img-fluid" />
                            </Link>
                        </div>

                        <section>
                            <div className="row">
                                <div className="col-lg-9 col-sm-12 mt-4 BorderRight">
                                    <h2 className="LatestNewsH ">{subCatName.CategoryName} বিভাগের সব খবর</h2>
                                    <section className="DCatNewsListArea">
                                        <div className="row">
                                            {catNewsMore.map((nc) => (
                                                <div className="col-lg-6 col-12 d-flex" key={nc.ContentID}>
                                                    <div className="DCatNewsList align-self-stretch">
                                                        <Link to={`/details/${catSlug}/${nc.ContentID}`} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-5 col-sm-4 col-5">
                                                                    <div className="DImgZoomBlock">
                                                                        <picture>
                                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading}  style={{width: "100%", height:"auto"}}/>
                                                                        </picture>
                                                                        {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-7 col-sm-8 col-7">
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
                                    </section>
                                    {showMore && (
                                        <div id="btnDiv" className="text-center mt-4 mb-4">
                                            <button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>আরও...</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            ) : <ErrorPage />}
        </>
    );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { Link } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import eventBanner from '../../assets/media/common/dakso-nirbachon.png'
// import CricketSeries from '../../assets/media/common/cricket-series.jpg';
var lazyloaded = false
var limit = 2
export default function SpecialTop() {
    const [LeadSpecial1, setLeadSpecial1] = useState([])
    const [LeadSpecial2, setLeadSpecial2] = useState([])
    const [tagsRelatedNews, setTagsRelatedNews] = useState([]);

    try {

        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateSpecialTopOne.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setLeadSpecial1(data[0]);
                        setLeadSpecial2(data.slice(1, 2))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
            const formData = { 'slug': "ডাকসু নির্বাচন ", 'limit': limit, 'offset': 0 }
            axios
                .post(`${process.env.REACT_APP_API_URL}tag-content`, formData)
                .then(({ data }) => {
                    if (data.tag_contents) {
                        setTagsRelatedNews(data.tag_contents);
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])


        return (
            <>


                {/* Short Event Section */}
                <div className="short-event">
                    <Link to={"/tags/ডাকসু নির্বাচন"}>
                        <div className="banner-area">
                            <img src={eventBanner} alt="Deshkalnews.com" title='Deshkalnews.com' className='img-fluid' />
                        </div>
                    </Link>
                    <div className='leadTop3'>
                        {tagsRelatedNews?.map((nc, i) => {
                            return (
                                <div className="CommonLeadList2" key={i} >
                                    <Link to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}  >
                                        <div className="row">
                                            <div className="col-lg-5 col-5">
                                                <div className="Imgresize">
                                                    {nc.ImageSmPath == null ?
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" width={800} height={450} /> :
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" width={800} height={450} />}

                                                    {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-7 col-7">
                                                <div className="Desc">
                                                    {nc.AltHomeTitle ?
                                                        <h2 className="Title">{nc.AltHomeTitle}</h2> :
                                                        <>
                                                            {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                                <h3 className="Title">{nc.DetailsHeading}</h3> :
                                                                <h3 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h3>
                                                            }
                                                        </>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}</div>


                </div>
                <div className="leadTop3">
                    <div className="Common-list">
                        {LeadSpecial1.ShowLiveBlog === 2 && LeadSpecial1.LiveBlogStatus === 2 ?
                            <div className="Common-list-details">
                                <Link to={"/details/" + LeadSpecial1.categorySlug + "/" + LeadSpecial1.ContentID} onClick={scrollTop}>
                                    <div className="row">
                                        <div className="col-lg-12 col-5 Imgresize">
                                            {LeadSpecial1.ImageSmPath == null ?
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={LeadSpecial1.DetailsHeading} title={LeadSpecial1.DetailsHeading} className="img-fluid img100" width={300} height={169} /> :
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + LeadSpecial1.ImageSmPath} alt={LeadSpecial1.DetailsHeading} title={LeadSpecial1.DetailsHeading} className="img-fluid img100" width={300} height={169} />}

                                            {LeadSpecial1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                        </div>
                                        <div className="col-lg-12 col-7">
                                            <div className="Desc">
                                                {LeadSpecial1.AltHomeTitle ?
                                                    <h2 className="Title">{LeadSpecial1.AltHomeTitle}</h2> :
                                                    <>
                                                        {LeadSpecial1.ContentSubHeading === null || LeadSpecial1.ContentSubHeading === undefined ?
                                                            <h2 className="Title">{LeadSpecial1.DetailsHeading}</h2> :
                                                            <h2 className="Title"> <span className="subHeading">{LeadSpecial1.ContentSubHeading + " / "}</span> {LeadSpecial1.DetailsHeading}</h2>
                                                        }
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            :

                            <div className="Common-list-details">
                                <Link to={"/details/" + LeadSpecial1.categorySlug + "/" + LeadSpecial1.ContentID} onClick={scrollTop}>
                                    <div className="row">
                                        <div className="col-lg-12 col-5 Imgresize">
                                            {LeadSpecial1.ImageThumbPath == null ?
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={LeadSpecial1.DetailsHeading} title={LeadSpecial1.DetailsHeading} className="img-fluid img100" width={120} height={67} /> :
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + LeadSpecial1.ImageSmPath} alt={LeadSpecial1.DetailsHeading} title={LeadSpecial1.DetailsHeading} className="img-fluid img100" width={120} height={67} />}

                                            {LeadSpecial1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                        </div>
                                        <div className="col-lg-12 col-7">
                                            <div className="Desc">
                                                {LeadSpecial1.AltHomeTitle ?
                                                    <h2 className="Title"> {LeadSpecial1.AltHomeTitle}</h2> :
                                                    <>
                                                        {LeadSpecial1.ContentSubHeading === null || LeadSpecial1.ContentSubHeading === undefined ?
                                                            <h2 className="Title"><span className="LiveButton">
                                                                <div className="circle--inner"></div></span>{LeadSpecial1.DetailsHeading}</h2> :
                                                            <h2 className="Title"> <span className="subHeading"><span className="LiveButton">
                                                                <div className="circle--inner"></div></span>{LeadSpecial1.ContentSubHeading + " / "}</span> {LeadSpecial1.DetailsHeading}</h2>
                                                        }
                                                    </>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>}

                    </div>
                    {
                        LeadSpecial2.map((nc, i) => {
                            return (
                                <>
                                    {nc.ShowLiveBlog === 2 && nc.LiveBlogStatus === 2 ?
                                        <div className="CommonLeadList2" key={i} >
                                            <Link to={"/details/" + nc.categorySlug + "/" + nc.ContentID} onClick={scrollTop}  >
                                                <div className="row">
                                                    <div className="col-lg-5 col-5">
                                                        <div className="Imgresize">
                                                            {nc.ImageThumbPath == null ?
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" width={120} height={67} /> :
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" width={120} height={67} />}
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7 col-7">
                                                        <div className="Desc">
                                                            {nc.AltHomeTitle ?
                                                                <h2 className="Title">{nc.AltHomeTitle}</h2> :
                                                                <>
                                                                    {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                                        <h3 className="Title">{nc.DetailsHeading}</h3> :
                                                                        <h3 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h3>
                                                                    }
                                                                </>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div> :
                                        <div className="CommonLeadList2" key={i} >
                                            <Link to={"/details/" + nc.categorySlug + "/" + nc.ContentID} onClick={scrollTop}  >
                                                <div className="row">
                                                    <div className="col-lg-5 col-5">
                                                        <div className="Imgresize">
                                                            {nc.ImageThumbPath == null ?
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" width={120} height={67} /> :
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" width={120} height={67} />}

                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7 col-7">
                                                        <div className="Desc">
                                                            {nc.AltHomeTitle ?
                                                                <h2 className="Title">{nc.AltHomeTitle}</h2> :
                                                                <>
                                                                    {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                                        <h2 className="Title"><span className="LiveButton">
                                                                            <div className="circle--inner"></div></span>{nc.DetailsHeading}</h2> :
                                                                        <h2 className="Title"> <span className="subHeading"><span className="LiveButton">
                                                                            <div className="circle--inner"></div></span>{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h2>
                                                                    }
                                                                </>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    }
                                </>

                            )
                        })
                    }


                </div>

            </>
        )
    }
    catch {
        <ErrorPage />
    }
}

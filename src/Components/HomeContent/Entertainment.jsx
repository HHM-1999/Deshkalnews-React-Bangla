import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";

var lazyloaded = false
export default function Entertainment() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    const [List3, setList3] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory10.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setList1(data[0]);
                    setList2(data.slice(1, 6))
                    setList3(data.slice(6, 11))
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>
            <section className="entertainment-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2><Link to='/entertainment' onClick={scrollTop}><i className="fa-solid fa-chevron-right"></i>বিনোদন</Link></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 border-right-inner">
                            {List1 ?
                                <div className="CommonLead">
                                    <Link to={"/details/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                                        <div className="Imgresize">
                                            <picture>
                                                {List1.ImageBgPath == null ?
                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" width={800} height={450} />
                                                    :
                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" width={800} height={450} />

                                                }
                                                {List1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                            </picture>
                                        </div>
                                        <div className="Desc">
                                            {List1.AltHomeTitle ?
                                                <h2 className="Title">{List1.AltHomeTitle}</h2> :
                                                <>
                                                    {List1.ContentSubHeading === null || List1.ContentSubHeading === undefined ?
                                                        <h2 className="Title">{List1.DetailsHeading}</h2> :
                                                        <h2 className="Title"> <span className="subHeading">{List1.ContentSubHeading + " / "}</span> {List1.DetailsHeading}</h2>
                                                    }
                                                </>
                                            }
                                            <div className="Brief">
                                                <p>{List1.ContentBrief}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                : " "}
                        </div>
                        <div className="col-lg-3 order-lg-first border-right-inner">
                            {List2.map((nc, i) => {
                                return (
                                    <div className="CommonLeadList" key={i}>
                                        <Link to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-6 col-7 d-flex align-items-center">
                                                    <div className="Desc">
                                                        {nc.AltHomeTitle ?
                                                            <h2 className="Title">{nc.DetailsHeading}</h2> :
                                                            <>
                                                                {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                                    <h2 className="Title">{nc.DetailsHeading}</h2> :
                                                                    <h2 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h2>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-5">
                                                    <div className="Imgresize">
                                                        <picture>
                                                            {nc.ImageThumbPath == null ?
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" width={120} height={67} />
                                                                :
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" width={120} height={67} />

                                                            }
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                        </picture>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="col-lg-3">
                            {List3.map((nc, i) => {
                                return (
                                    <div className="CommonLeadList" key={i}>
                                        <Link to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-6 col-7 d-flex align-items-center">
                                                    <div className="Desc">
                                                        {nc.AltHomeTitle ?
                                                            <h2 className="Title">{nc.AltHomeTitle}</h2> :
                                                            <>
                                                                {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                                    <h2 className="Title">{nc.DetailsHeading}</h2> :
                                                                    <h2 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h2>
                                                                }
                                                            </>
                                                        }

                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-5">
                                                    <div className="Imgresize">
                                                        <picture>
                                                            {nc.ImageThumbPath == null ?
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} fetchpriority="high" title={nc.DetailsHeading} className="img-fluid img100" width={120} height={67} />
                                                                :
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} fetchpriority="high" title={nc.DetailsHeading} className="img-fluid img100" width={120} height={67} />

                                                            }
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                        </picture>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="seeMore">
                        <Link className="btn btnMore" to='/entertainment' onClick={scrollTop}>আরও...</Link>
                    </div>
                </div>
            </section>
        </>
    )

}

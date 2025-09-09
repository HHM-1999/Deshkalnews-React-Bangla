import { useEffect, useState } from "react";
import axios from "axios";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

var lazyloaded = false
export default function LawCourtMobile() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    // const [List3, setList3] = useState([])


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory8.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setList1(data[0]);
                    setList2(data.slice(1, 3))
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="section-heading">
                        <Link to='/court-of-law' onClick={scrollTop}>
                            <h2><i className="fa-solid fa-chevron-right"></i>আইন-আদালত</h2></Link>
                    </div>
                </div>
            </div>
            <div className="CommonSecNews3-wrapper">
                {List1 ?
                    <div className="CommonLead3">
                        <Link to={"/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                            <div className="row">
                                <div className="col-lg-7 Imgresize">
                                    <picture>
                                        {List1.ImageSmPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" width={300} height={169} />
                                            :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageSmPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" width={300} height={169} />

                                        }

                                        {List1.ShowVideo === 1 && <div className="video-icon"><i className="fas fa-play"></i></div>}
                                    </picture>
                                </div>
                                <div className="col-lg-5 d-flex">
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
                                </div>
                            </div>
                        </Link>
                    </div>
                    : " "}
            </div>
            <div className="row">
                <div className="col-lg-6">
                    {List2.map((nc, i) => {
                        return (
                            <div className="CommonLeadList" key={i}>
                                <Link to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                    <div className="row">
                                        <div className="col-lg-6 col-5">
                                            <div className="Imgresize">
                                                <picture>
                                                    {nc.ImageThumbPath == null ?
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" width={120} height={67} />
                                                        :
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100"  width={120} height={67}  />
                                                    }
                                                    {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                </picture>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-7">
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
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="seeMore">
                <Link className="btn btnMore" to='/economics' onClick={scrollTop}>আরও...</Link>
            </div>
        </>
    )

}

import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

var lazyloaded = false
export default function TodayDhaka() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory18.json`)
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
            <div className="education">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/today-in-dhaka' onClick={scrollTop}>ঢাকায় আজ</Link></h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" >
                        <div className="CommonLead">
                            <Link to={"/details/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                                <div className="Imgresize">
                                    <picture>
                                        {List1.ImageBgPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{ width: "800px", height: "100%" }} /> :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{ width: "800px", height: "100%" }} />}
                                        {List1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                    </picture>
                                </div>
                                <div className="Desc">
                                    {List1.AltHomeTitle ?
                                        <h2 className="Title">{List1.AltHomeTitle}
                                        </h2> :
                                        <h2 className="Title">{List1.DetailsHeading}
                                        </h2>
                                    }

                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {
                            List2.map((nc, i) => {
                                return (
                                    <div className="CommonLeadList" key={i}>
                                        <Link to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop} >
                                            <div className="row">
                                                <div className="col-lg-5 col-5">
                                                    <div className="Imgresize">
                                                        <picture>
                                                            {nc.ImageThumbPath == null ?
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{ width: "120px", height: "100%" }} />
                                                                :
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{ width: "120px", height: "100%" }} />

                                                            }
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                        </picture>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7 col-7">
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
                            })
                        }
                    </div>
                  
                </div>
                <div className="seeMore">
                    <Link className="btn btnMore" to='/today-in-dhaka' onClick={scrollTop}>আরও...</Link>
                </div>
            </div>
        </>
    )

}

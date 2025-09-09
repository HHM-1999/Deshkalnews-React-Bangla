

import { useEffect, useState } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";

import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";

var lazyloaded = false

export default function Foreign() {
    const [List2, setList2] = useState([])
    const [List3, setList3] = useState([])
    try {
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory21.json`)
                .then(({ data }) => {
                    // if (data.length > 0) {
                    setList2(data[0]);
                    setList3(data.slice(1, 5))
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                    // }
                });
        }, [])

        return (
            <>

                <div className="row">
                    <div className="col-12">
                        <div className="section-heading d-flex align-items-end">
                            <h2><Link to="/probash" onClick={scrollTop}><i className="fa-solid fa-chevron-right"></i>প্রবাস</Link> </h2>
                            {/* <div className="multiple-subcat-title">
                                <a href="#">ক্যাম্পাস</a>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="probash-sec">
                    {List2 ?
                        <div className="CommonLead">
                            <Link to={"/" + List2.Slug + "/" + List2.ContentID} onClick={scrollTop} >
                                <div className="row">
                                    <div className="col-lg-12 col-5 Imgresize">
                                        <picture>
                                            {List2.ImageBgPath == null ? 
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List2.DetailsHeading} title={List2.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "800px", height:"100%"}} />
                                                :
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List2.ImageBgPath} alt={List2.DetailsHeading} title={List2.DetailsHeading} fetchpriority="high" className="img-fluid img100"  style={{width: "800px", height:"100%"}}/>

                                            }
                                            {List2.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                        </picture>
                                    </div>
                                    <div className="col-lg-12 col-7">
                                        <div className="Desc">
                                            {List2.AltHomeTitle ?
                                                <h3 className="Title">{List2.AltHomeTitle}</h3> :
                                                <>
                                                    {List2.ContentSubHeading === null || List2.ContentSubHeading === undefined ?
                                                        <h3 className="Title">{List2.DetailsHeading}</h3> :
                                                        <h3 className="Title"> <span className="subHeading">{List2.ContentSubHeading + " / "}</span> {List2.DetailsHeading}</h3>
                                                    }
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        : ""}
                    {List3.map((nc, i) => {
                        return (
                            <>
                                <div className="CommonLeadList" key={i}>
                                    <Link to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
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
                                            <div className="col-lg-6 col-5">
                                                <div className="Imgresize">
                                                    <picture>
                                                        {nc.ImageThumbPath == null ?
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "120px", height:"100%"}} />
                                                            :
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "120px", height:"100%"}}/>
                                                        }
                                                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                    </picture>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            </>

                        )
                    })}
                    <div className="seeMore">
                        <Link className="btn btnMore" to="/probash" onClick={scrollTop}>আরও...</Link>
                    </div>

                </div>
            </>
        )
    }
    catch (error) {
        console.log(error);
    }
}

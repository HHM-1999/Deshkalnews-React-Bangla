

import { useEffect, useState } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";

import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
// import DOnlinePoll from "../DOnlinePoll";

var lazyloaded = false

export default function DeshJure() {
    const [List1, setList1] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory4.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setList1(data.slice(0, 6));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>

            <section className="TopSpeclNews">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading">
                                <h2><Link to='/country'><i className="fa-solid fa-chevron-right"></i>দেশজুড়ে</Link></h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="SpeclNewsArea">
                                <div className="row">
                                    {List1.map((nc, i) => {
                                        return (
                                            <div className="col-lg-4 d-flex" key={i}>
                                                <div className="CommonLead">
                                                    <Link to={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                                        <div className="row">
                                                            <div className="col-lg-12 Imgresize">
                                                                <picture>
                                                                    {nc.ImageBgPath == null ?
                                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "800px", height:"100%"}}/>
                                                                        :
                                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100"  style={{width: "800px", height:"100%"}}/>

                                                                    }
                                                                    {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                                </picture>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="Desc">
                                                                    {nc.AltHomeTitle ?
                                                                        <h3 className="Title">{nc.AltHomeTitle}</h3> :
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
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="seeMore">
                                <Link className="btn btnMore" to='/country' onClick={scrollTop}>আরও...</Link>
                            </div>
                        </div>
                    </div>

                </div>

            </section>




        </>
    )

}

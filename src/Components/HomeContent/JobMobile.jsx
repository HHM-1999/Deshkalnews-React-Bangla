import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

var lazyloaded = false
export default function JobMobile() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory20.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setList1(data[0]);
                    setList2(data.slice(1, 2))
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>
            <div className="job-area-news">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/jobs' onClick={scrollTop}>চাকরি</Link></h2>
                        </div>
                    </div>
                </div>

                <div className="CommonLead">
                    <Link to={"/details/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                        <div className="Imgresize">
                            <picture>
                                {List1.ImageBgPath == null ?
                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"100%"}} /> :
                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"100%"}} />}
                                {List1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                            </picture>
                        </div>
                        <div className="Desc">
                            {/* <h2 className="Title"> {List1.DetailsHeading}
                            </h2> */}
                            {List1.AltHomeTitle ?
                                <h2 className="Title">{List1.AltHomeTitle}</h2> :
                                <h2 className="Title">{List1.DetailsHeading}</h2>
                            }
                        </div>
                    </Link>
                </div>
                {
                    List2.map((item, index) => {
                        return (
                            <div className="CommonLeadList">
                                <Link to={"/details/" + item.Slug + "/" + item.ContentID} onClick={scrollTop} key={index}>
                                    <div className="row">
                                        <div className="col-lg-6 col-5">
                                            <div className="Imgresize">
                                                <picture className="MblHide">
                                                    {item.ImageSmPath == null ?
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={item.DetailsHeading} title={item.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"100%"}} /> :
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + item.ImageSmPath} alt={item.DetailsHeading} title={item.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"100%"}} />}
                                                    {item.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                </picture>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <div className="Desc">
                                                {/* <h2 className="Title"> {item.DetailsHeading}
                                                </h2> */}
                                                {item.AltHomeTitle ?
                                                    <h2 className="Title">{item.AltHomeTitle}</h2> :
                                                    <h2 className="Title">{item.DetailsHeading}</h2>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
                <div className="seeMore">
                    <Link className="btn btnMore" to='/jobs' onClick={scrollTop}>আরও...</Link>
                </div>
            </div>
        </>
    )

}

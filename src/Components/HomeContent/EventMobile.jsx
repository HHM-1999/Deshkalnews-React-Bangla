import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

var lazyloaded = false
export default function EventMobile() {
    const [List1, setList1] = useState([])
    // const [List2, setList2] = useState([])
    // const [List3, setList3] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory72.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setList1(data.slice(0, 4));
                    // setList2(data.slice(2, 4))
                    // setList3(data.slice(4, 9))
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
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/event' onClick={scrollTop}>ইভেন্ট</Link></h2>
                        </div>
                        <div className="row">
                            {List1.map((nc, index) => {

                                return (
                                    <div className="col-6" key={index}>
                                        <div className="CommonLead">
                                            <Link to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                                <div className="Imgresize">
                                                    <picture>
                                                        {nc.ImageBgPath == null ?
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" 
                                                            style={{width: "100%", height:"100%"}}  /> :
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} fetchpriority="high" className="img-fluid img100" 
                                                            style={{width: "100%", height:"100%"}} />}
                                                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                    </picture>
                                                </div>
                                                <div className="Desc">
                                                    {/* <h2 className="Title">{nc.DetailsHeading}
                                                    </h2> */}
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
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }

                            )}

                        </div>
                    </div>
                </div>
                <div className="seeMore">
                    <Link className="btn btnMore" to='/event' onClick={scrollTop}>আরও...</Link>
                </div>
            </div>
        </>
    )

}

import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

var lazyloaded = false
export default function Sahitto() {
    const [List1, setList1] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory17.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setList1(data[0]);

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
                        <h2><i className="fa-solid fa-chevron-right"></i><Link to='/literature' onClick={scrollTop}>সাহিত্য</Link></h2>
                    </div>
                </div>
            </div>

            <div className="CommonSecNews3-wrapper">
                <div className="CommonLead3">
                    <Link to={"/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                        <div className="row">
                            <div className="col-sm-6 d-flex align-items-center Imgresize">
                                <picture>
                                    {List1.ImageBgPath == null ?
                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "800px", height:"100%"}} />
                                        :
                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "800px", height:"100%"}} />

                                    }

                                    {List1.ShowVideo === 1 && <div className="video-icon"><i className="fas fa-play"></i></div>}
                                </picture>
                            </div>
                            <div className="col-sm-6 d-flex align-items-center">
                                <div className="Desc">
                                    {List1.AltHomeTitle ?
                                        <h2 className="Title">{List1.AltHomeTitle}
                                        </h2> :
                                        <h2 className="Title">{List1.DetailsHeading}
                                        </h2>
                                    }

                                    <div className="Brief">
                                        <p>{List1.ContentBrief}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
